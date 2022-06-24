package com.j32bit.inviso.shared;

import com.j32bit.inviso.enums.SearchOperation;
import com.j32bit.inviso.utils.SearchCriteria;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.math.BigDecimal;
import java.util.*;

/**
 *
 * @param <T> entity
 */
@NoArgsConstructor
@AllArgsConstructor
public class SearchSpecification<T> implements Specification<T> {

    private Set<SearchCriteria> searchCriteriaList;

    public void add(SearchCriteria criteria) {
        searchCriteriaList.add(criteria);
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        for (SearchCriteria criteria : searchCriteriaList) {
            if (criteria.getOperation().equals(SearchOperation.GREATER_THAN)) {
                predicates.add(criteriaBuilder.greaterThan(
                        getPath(root, criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.LESS_THAN)) {
                predicates.add(criteriaBuilder.lessThan(
                        getPath(root, criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.GREATER_THAN_EQUAL)) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        getPath(root, criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.LESS_THAN_EQUAL)) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        getPath(root, criteria.getFieldName()), criteria.getValue().toString()));
            } else if (criteria.getOperation().equals(SearchOperation.NOT_EQUAL)) {
                predicates.add(criteriaBuilder.notEqual(
                        getPath(root, criteria.getFieldName()), criteria.getValue()));
            } else if (criteria.getOperation().equals(SearchOperation.EQUAL)) {
                predicates.add(criteriaBuilder.equal(
                        getPath(root, criteria.getFieldName()), criteria.getValue()));
            } else if (criteria.getOperation().equals(SearchOperation.MATCH)) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(getPath(root, criteria.getFieldName()).as(String.class)),
                        "%" + criteria.getValue().toString().toLowerCase() + "%"));
            } else if (criteria.getOperation().equals(SearchOperation.MATCH_END)) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(getPath(root, criteria.getFieldName()).as(String.class)),
                        criteria.getValue().toString().toLowerCase() + "%"));
            } else if (criteria.getOperation().equals(SearchOperation.MATCH_START)) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(getPath(root, criteria.getFieldName()).as(String.class)),
                        "%" + criteria.getValue().toString().toLowerCase()));
            } else if (criteria.getOperation().equals(SearchOperation.IN)) {
                System.out.println("???????????????????????????????????????????????????????????????");
                predicates.add(criteriaBuilder.in(getPath(root, criteria.getFieldName())).value(criteria.getValue()));
            } else if (criteria.getOperation().equals(SearchOperation.NOT_IN)) {
                predicates.add(criteriaBuilder.not(getPath(root, criteria.getFieldName())).in(criteria.getValue()));
            }
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private <Y> Path<Y> getPath(Root<T> root, String attributeName) {
        List<String> list = new LinkedList<>(
                Arrays.asList(attributeName.split("\\.")));

        Path<Y> path = list.size() > 1 ?
                root.join(list.remove(0)) : root.get(list.remove(0));
        for (String part : list) {
            path = path.get(part);
        }
        return path;
    }

}
