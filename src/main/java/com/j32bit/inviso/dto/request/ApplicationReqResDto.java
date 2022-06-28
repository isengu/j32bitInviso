package com.j32bit.inviso.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationReqResDto {
    private Long id;
    private String description;
    private String name;
    private Version version;
    private String shortName;
    private Date createdAt;
    private Date updatedAt;
    private List<Page> pages;



    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Version {
        private final Integer id = 1;
        private BigDecimal version;

        public String getVersion() {
            return version.setScale(1, RoundingMode.HALF_UP).toString();
        }
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Page {
        private Long id;
        private String title;
        private Integer pageNumber;
        private String shortName;
        private Boolean isPageNameHide;
        private Boolean homePage;
        private List<Form> forms;
        private List<Navigation> navigations;

        @Getter
        @Setter
        @Builder
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Navigation {
            private Long id;
            private Integer orderNumber;
            private String name;
            private Function functions;

            public static Navigation create(Integer orderNumber, Long applicationId, String text, String pageShortName) {
                return Navigation.builder()
                        .orderNumber(orderNumber)
                        .name(text)
                        .functions(Function.builder()
                                .description("Navigation")
                                .functionDetail("$state.go(\"" + pageShortName + "\");")
                                .applicationId(applicationId)
                                .functionType(FunctionType.navigation())
                                .build())
                        .build();
            }

            public static Navigation create(Integer orderNumber, Long applicationId, String text) {
                return Navigation.builder()
                        .orderNumber(orderNumber)
                        .name(text)
                        .functions(Function.builder()
                                .description("submit")
                                .functionDetail("submit(false)")
                                .applicationId(applicationId)
                                .functionType(FunctionType.submit())
                                .build())
                        .build();
            }

            @Getter
            @Setter
            @Builder
            @AllArgsConstructor
            @NoArgsConstructor
            public static class Function {
                private Long id;
                private String description;
                private String functionDetail;
                private Long applicationId;
                private FunctionType functionType;
            }

            @Getter
            @Setter
            @Builder
            @AllArgsConstructor
            @NoArgsConstructor
            public static class FunctionType {
                private Long id;
                private String name;
                private String value;

                public static FunctionType navigation() {
                    return new FunctionType(3L, "Navigation Functions", "3");
                }
                public static FunctionType submit() {
                    return new FunctionType(1L, "STATIC_FUNCTIONS", "1");
                }
            }
        }
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Form {
        private Long id;
        private String title;
        private String shortName;
        private List<Row> rows;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Row {
        private List<Component> components;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Component {
        private Long id;
        private Long formComponentId;
        private String type;
        private Integer rowNumber;
        private Integer colNumber;
        private String colSize;
        private String colAlign;
        private String shortName;
        private List<Option> options;
        private List<Validation> validations;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Option {
        private Long id;
        private Integer orderNumber;
        private String key;
        private String value;
        private String type;
        private String name;
        private Long optionTypeId;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Validation {
        private Long id;
        private String name;
        private String value;
        private String errorMessage;
        private Boolean selectable;
        private Integer type;
    }
}
