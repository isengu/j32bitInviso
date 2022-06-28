package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.Application;
import com.j32bit.inviso.domain.ApplicationVersion;
import com.j32bit.inviso.dto.ApplicationDto;
import com.j32bit.inviso.dto.ApplicationVersionDto;
import com.j32bit.inviso.dto.request.ApplicationReqResConverter;
import com.j32bit.inviso.dto.request.ApplicationReqResDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.dto.response.ApplicationStructureNameDto;
import com.j32bit.inviso.enums.SearchOperation;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.ApplicationVersionRepository;
import com.j32bit.inviso.utils.SearchCriteria;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class ApplicationVersionService {

    private final ApplicationVersionRepository applicationVersionRepository;
    private final ApplicationService applicationService;
    private final ModelMapper modelMapper;

    /**
     * Get count of active(not deleted) applications.
     *
     * @return active application count.
     */
    public Long countOfNotDeletedApplications() {
        return applicationVersionRepository.countOfNotDeletedApplications();
    }

    /**
     * Find all applications last version.
     *
     * @return {@link List} of {@link ApplicationReqResDto}s.
     */
    public List<ApplicationReqResDto> getAllApplications() {
        return applicationVersionRepository
                .getAllApplicationsLastVersions()
                .stream()
                .map(e -> ApplicationReqResConverter.toResponse(
                        modelMapper.map(e, ApplicationVersionDto.class)))
                .collect(Collectors.toList());
    }

    /**
     * Find names and ids of all active(not deleted)
     * applications last versions as list.
     *
     * @return {@link List} of {@link ApplicationStructureNameDto}s.
     */
    public List<ApplicationStructureNameDto> getStructureNames() {
        return applicationVersionRepository.getStructureNames();
    }

    /**
     * Find structure names and ids of applications
     * that are appointed to given user.
     *
     * @param username username.
     * @return {@link List} of {@link ApplicationStructureNameDto}s.
     */
    public List<ApplicationStructureNameDto> getStructureNamesOfUser(String username) {
        return applicationVersionRepository.getStructureNamesOfUser(username);
    }

    /**
     * Find all application versions with given specifications and return as pageable.
     *
     * @param withSpecRequestDto specifications.
     * @return {@link Page} of {@link ApplicationVersionDto}s.
     */
    public Page<ApplicationVersionDto> findAllWithSpec(WithSpecRequestDto withSpecRequestDto) {
        // if "status=1"(deleted) isn't specified always add "status=0"(not deleted) creteria
        Set<SearchCriteria> criterias = withSpecRequestDto.getFilterRequest();
        if (!criterias.contains(new SearchCriteria("status", "1", null))) {
            criterias.add(new SearchCriteria("status", "0", SearchOperation.EQUAL));
        }

        ApplicationVersionSpecification searchSpecification =
                new ApplicationVersionSpecification(criterias);

        Sort sort = withSpecRequestDto.getOrder().equals("ASC") ?
                Sort.by(Sort.Direction.ASC, "id") :
                Sort.by(Sort.Direction.DESC, "id");

        int pageNumber = withSpecRequestDto.getOffset() / withSpecRequestDto.getLimit();

        Pageable pageable = PageRequest.of(pageNumber, withSpecRequestDto.getLimit(), sort);

        Page<ApplicationVersion> page = applicationVersionRepository
                .findAll(searchSpecification, pageable);

        return page.map(e -> modelMapper.map(e, ApplicationVersionDto.class));
    }

    /**
     * Find last version of given application id.
     *
     * @param applicationId aplication id.
     * @return {@link ApplicationReqResDto}
     */
    public ApplicationReqResDto getLastVersion(Long applicationId) {
        Optional<ApplicationVersion> application = applicationVersionRepository
                        .getLastVersionOfApplication(applicationId);

        ApplicationVersionDto applicationVersionDto =
                modelMapper.map(
                application.orElseThrow(() -> new InvisoException(
                        HttpStatus.NOT_FOUND,
                        "Application Not Found",
                        "Application not found with id: " + applicationId)),
                ApplicationVersionDto.class);

        return ApplicationReqResConverter.toResponse(applicationVersionDto);
    }

    /**
     * Get applications specified version by given application id and version number.
     *
     * @param applicationId given application id.
     * @param version given version.
     * @return {@link ApplicationVersionDto}.
     */
    public ApplicationVersionDto getVersionOfApplication(Long applicationId, BigDecimal version) {
        ApplicationVersion applicationVersion = applicationVersionRepository
                .findByApplicationIdAndVersion(applicationId, version)
                .orElseThrow(() -> new InvisoException(
                        HttpStatus.NOT_FOUND,
                        "Application Not Found",
                        "Application with id: " + applicationId + " and version: " + version + ", not found!"));

        return modelMapper.map(applicationVersion, ApplicationVersionDto.class);
    }

    /**
     * Get applications specified version without its whole structure
     * (like pages, components, etc.) by given application id and version number.
     *
     * @param applicationId
     * @param version
     * @return
     */
    public ApplicationVersionDto getAppInfoOfVersionOfApplication(Long applicationId, BigDecimal version) {
        ApplicationVersion applicationVersion = applicationVersionRepository
                .findAppInfoByApplicationIdAndVersion(applicationId, version)
                .orElseThrow(() -> new InvisoException(
                        HttpStatus.NOT_FOUND,
                        "Application Not Found",
                        "Application with id: " + applicationId + " and version: " + version + ", not found!"));

        return modelMapper.map(applicationVersion, ApplicationVersionDto.class);
    }

    /**
     * Save application structure.
     *
     * @param json structure of application to be saved as json string.
     * @return recently saved application as {@link ApplicationReqResDto}.
     */
    public ApplicationReqResDto save(String json) {
        try {
            ApplicationVersionDto applicationVersionDto = ApplicationReqResConverter.fromRequest(json);
            if (applicationVersionDto.getApplication() == null) {
                // first time saving
                applicationVersionDto.setApplication(
                        modelMapper.map(
                                applicationService.save(new ApplicationDto()),
                                ApplicationDto.class));
            }

            ApplicationVersion applicationVersion =
                    applicationVersionRepository
                            .save(modelMapper.map(applicationVersionDto,
                                    ApplicationVersion.class));

            return ApplicationReqResConverter
                    .toResponse(modelMapper.map(applicationVersion,
                            ApplicationVersionDto.class));
        }
        catch (IOException e) {
            throw new InvisoException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error",
                    e.getLocalizedMessage(),
                    e.getLocalizedMessage() + " occured. Caused class: " + e.getClass());
        }
    }

    /**
     * Delete(soft delete) application by it's shortname.
     * (update "status=1" of last version of shortname given application)
     *
     * @param shortName short name of application to be deleted.
     */
    public void delete(String shortName) {
        if (shortName == null) {
            throw new InvisoException(
                    HttpStatus.BAD_REQUEST,
                    "Shortname Not Provided",
                    "Please provide short name of the application you'd like to delete.",
                    "No shortname provided for application to be deleted.");
        }
        applicationVersionRepository.softDeleteByShortName(shortName);
    }

}
