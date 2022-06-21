package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.ApplicationVersion;
import com.j32bit.inviso.enums.SearchOperation;
import com.j32bit.inviso.utils.SearchCriteria;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Difference from SearchSpecification is this one creates
 * a subquery as in below and adds it as specification at the beggining.
 * Then adds given specifications.
 *
 * Main query:
 * Select a From ApplicationVersion a Where a.version =
 * (Select max(a1.version) From ApplicationVersion a1
 * Where a1.application.id = a.application.id)
 */
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationVersionSpecification implements Specification<ApplicationVersion> {

    private Set<SearchCriteria> searchCriteriaList;

    public void add(SearchCriteria criteria) {
        searchCriteriaList.add(criteria);
    }

    @Override
    public Predicate toPredicate(Root<ApplicationVersion> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        Subquery<Long> subQuery = query.subquery(Long.class);
        Root<ApplicationVersion> subRoot = subQuery.from(ApplicationVersion.class);
        subQuery.select(criteriaBuilder.max(subRoot.get("version")));
        subQuery.where(criteriaBuilder.equal(subRoot.get("application"), root.get("application")));

        predicates.add(criteriaBuilder.equal(root.get("version"), subQuery));

        for (SearchCriteria criteria : searchCriteriaList) {
            if (criteria.getOperation().equals(SearchOperation.GREATER_THAN)) {
                predicates.add(criteriaBuilder.greaterThan(
                        root.get(criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.LESS_THAN)) {
                predicates.add(criteriaBuilder.lessThan(
                        root.get(criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.GREATER_THAN_EQUAL)) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get(criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.LESS_THAN_EQUAL)) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get(criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.NOT_EQUAL)) {
                predicates.add(criteriaBuilder.notEqual(
                        root.get(criteria.getFieldName()), criteria.getValue()));
            } else if (criteria.getOperation().equals(SearchOperation.EQUAL)) {
                predicates.add(criteriaBuilder.equal(
                        root.get(criteria.getFieldName()), criteria.getValue()));
            } else if (criteria.getOperation().equals(SearchOperation.MATCH)) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(criteria.getFieldName()).as(String.class)),
                        "%" + criteria.getValue().toString().toLowerCase() + "%"));
            } else if (criteria.getOperation().equals(SearchOperation.MATCH_END)) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(criteria.getFieldName()).as(String.class)),
                        criteria.getValue().toString().toLowerCase() + "%"));
            } else if (criteria.getOperation().equals(SearchOperation.MATCH_START)) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(criteria.getFieldName()).as(String.class)),
                        "%" + criteria.getValue().toString().toLowerCase()));
            } else if (criteria.getOperation().equals(SearchOperation.IN)) {
                predicates.add(criteriaBuilder.in(root.get(criteria.getFieldName())).value(criteria.getValue()));
            } else if (criteria.getOperation().equals(SearchOperation.NOT_IN)) {
                predicates.add(criteriaBuilder.not(root.get(criteria.getFieldName())).in(criteria.getValue()));
            }
        }


        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
