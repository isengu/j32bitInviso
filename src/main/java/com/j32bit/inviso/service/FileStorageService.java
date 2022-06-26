package com.j32bit.inviso.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final Path root = Paths.get("uploads");

    /**
     * initialize folder where uploaded files will be located.
     */
    public void init() {
        try {
          Files.createDirectory(root);
        } catch (IOException e) {
          throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    /**
     * save the given file.
     *
     * @param multipartFile given file.
     * @return uniquely created filename.
     */
    public String save(MultipartFile multipartFile) {
        String fileName = "file" + new Date().getTime() + "." +
                getExtensionOfFilename(multipartFile.getOriginalFilename())
                        .orElse("txt");
        try {

          Files.copy(multipartFile.getInputStream(),
                  this.root.resolve(fileName));

          return fileName;

        } catch (Exception e) {

          throw new RuntimeException("Could not store the file. Error: " + e.getMessage());

        }
    }

    /**
     * load the requested file.
     *
     * @param filename file name.
     * @return requested file.
     */
    public Resource load(String filename) {
        try {
          Path file = root.resolve(filename);

          Resource resource = new UrlResource(file.toUri());
          if (resource.exists() || resource.isReadable()) {
            return resource;
          } else {
            throw new RuntimeException("Could not read the file!");
          }
        } catch (MalformedURLException e) {
          throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    /**
     * obtain file extension from filename.
     * <p>
     * exceptions:
     * <br>
     * (no extension) file -> empty String
     * <br>
     * (only extension) .gitignore -> gitignore
     * </p>
     *
     * @param filename file name.
     * @return file extension.
     */
    private Optional<String> getExtensionOfFilename(String filename) {
        return Optional.ofNullable(filename)
          .filter(f -> f.contains("."))
          .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

}
