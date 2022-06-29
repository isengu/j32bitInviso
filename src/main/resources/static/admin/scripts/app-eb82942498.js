var backendLocation = window.location.origin;
! function() {
    "use strict";

    function e(e) {
        e.state("formPage", {
            url: "/formPage",
            templateUrl: "app/pages/form-page/form-page.html"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages", []).config(e)
}(),
function() {
    "use strict";
    var e = "//" + location.hostname;
    "" != location.port && (e += ":" + location.port);
    e = backendLocation;
    angular.module("BlurAdmin.login", ["ngCookies", "angular-md5", "pascalprecht.translate", "ui.bootstrap"]).constant("authenticationHeader", {
        grant_type: "password",
        client_id: "mfc",
        client_secret: "secret"
    }).constant("authenticationURL", {
        url: "/api/authentication/token",
        controlTokenURL: "/api/authentication/checkAuth",
        logoutURL: "/logout"
    }).constant("profileURLs", {
        updateUserURL: "/api/user/update",
        getUserInformationURL: "/api/user/getUserCredentials"
    }).constant("forgotPasswordURL", "/mfc/user/forgotPassword").constant("connectionConfigURL", e).constant("mailConfigURL", e + "/admin").config(["$translateProvider", function(e) {
        e.translations("en", translationsEN), e.translations("tr", translationsTR), e.registerAvailableLanguageKeys(["en", "tr"], {
            en_US: "en",
            en_UK: "en",
            tr: "tr"
        }).determinePreferredLanguage(), e.useSanitizeValueStrategy("escape")
    }])
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.password", ["ngCookies", "pascalprecht.translate", "ui.router", "ui.bootstrap", "BlurAdmin.login"]).constant("passwordURLs", {
        savePasswordURL: "/mfc/user/resetPassword"
    })
}(),
function() {
    "use strict";

    function e(e) {
        e.otherwise("/dashboard")
    }

    function t(e, t, a, o, n) {
        e.$on("$stateChangeStart", (function(o, i, s, r, l, c) {
            var d = !1,
                p = !1;
            if (e.roles = n.getObject("roles"), e.hasAdminRole = n.get("hasAdminRole"), "false" == e.hasAdminRole) {
                for (var m = 0; m < e.roles.length; m++) "RPRTR" == e.roles[m].shortName && "report.reportResult" != i.name && "report.reportDesign" != i.name && "report.formDataExport" != i.name ? d = !0 : "SPRVSR" == e.roles[m].shortName && "controlManagement.assignApplication" != i.name && "controlManagement.assignTaskAndEquipment" != i.name && (p = !0);
                d && p && t.path("dashboard")
            }
            "viewReport" == i.name && "report.reportResult" != r.name && t.path("report.reportResult"), "form" == i.name ? ("forms" != r.name && t.path("dashboard"), e.isInAdminFormPage = !0) : e.isInAdminFormPage = !1, "report.reportResult" == i.name && "viewReport" == r.name ? e.isFromReportResultPage = !0 : e.isFromReportResultPage = !1, "formManagement.indexPalette" == r.name && (e.isEditorSaved || (e.toStateName = i.name, a.open({
                animation: !1,
                backdrop: "static",
                keyboard: !1,
                controller: "ConfirmBeforeClosingTheEditorCTRL",
                templateUrl: "app/pages/palette/confirmModal/confirmBeforeClosingTheEditor.html"
            })))
        }))
    }
    e.$inject = ["$urlRouterProvider"], t.$inject = ["$rootScope", "$location", "$uibModal", "$state", "$cookies"], angular.module("BlurAdmin.pages", ["ui.router", "BlurAdmin.pages.dashboard", "BlurAdmin.pages.form-management", "BlurAdmin.pages.task-management", "BlurAdmin.pages.report", "BlurAdmin.pages.user", "BlurAdmin.pages.profile", "BlurAdmin.pages.change-password", "BlurAdmin.pages.logout", "BlurAdmin.pages.more", "BlurAdmin.pages.forms", "BlurAdmin.pages.task"]).config(e).run(t)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme", ["toastr", "chart.js", "angular-chartist", "angular.morris-chart", "textAngular", "BlurAdmin.theme.components", "BlurAdmin.theme.inputs"])
}(),
function() {
    "use strict";

    function e(e) {
        e.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/pages/dashboard/dashboard.html",
            title: "SIDEMENU_HOME",
            controller: "dashboardCtrl",
            sidebarMeta: {
                icon: "ion-android-home",
                order: 0
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.dashboard", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("changePassword", {
            url: "/changePassword",
            title: "MENU_CHANGEPASSWORD",
            templateUrl: "app/pages/change-password/change-password.html",
            controller: "ChangePasswordCTRL"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.change-password", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = {
            name: "formManagement.indexPalette",
            url: "/indexPalette",
            templateUrl: "app/pages/palette/indexPalette.html",
            title: "SIDEMENU_PALETTE",
            controller: "indexPaletteCTRL",
            sidebarMeta: {
                order: 0,
                icon: "ion-android-color-palette"
            }
        };
        e.state({
            name: "formManagement",
            url: "/formManagement",
            template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: !0,
            title: "SIDEMENU_FORM_MANAGEMENT",
            sidebarMeta: {
                icon: "ion-ios-paper-outline",
                order: 1
            }
        }), e.state({
            name: "formManagement.assignApplication",
            url: "/assignApplication",
            templateUrl: "app/pages/form-management/assign-application/assign-application.html",
            title: "SIDEMENU_CONTROLMANAGEMENT_ASSIGNAPPLICATION",
            sidebarMeta: {
                order: 1
            }
        }), "jetblue.invisoapp.com.tr" == location.hostname ? 1 == getCookiebyName("isUserRootAdmin") && e.state(t) : e.state(t)
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.form-management", []).config(e)
}();
var getCookiebyName = function(e) {
    var t = document.cookie.match(new RegExp(e + "=([^;]+)"));
    return t ? t[1] : null
};
! function() {
    "use strict";

    function e(e) {
        e.state("forms", {
            url: "/forms",
            templateUrl: "app/pages/forms/all-forms.html",
            title: "SIDEMENU_FORMS",
            controller: "allFormCTRL",
            sidebarMeta: {
                icon: "ion-compose",
                order: 9
            }
        }).state("form", {
            url: "/form",
            cache: !1,
            templateUrl: "app/pages/forms/form.html",
            controller: "formCTRL"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.forms", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("logout", {
            url: "/logout",
            templateUrl: "app/pages/logout/logout.html",
            controller: "LogOutCTRL"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.logout", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {

    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.more", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("report", {
            url: "/report",
            template: '<ui-view autoscroll="true" autoscroll-body-top=""></ui-view>',
            abstract: !0,
            title: "SIDEMENU_REPORT",
            sidebarMeta: {
                icon: "ion-ios-copy",
                order: 3
            }
        }).state("report.reportResult", {
            url: "/reportResult",
            templateUrl: "app/pages/report/report-result/report.html",
            title: "SIDEMENU_REPORT_RESULT",
            controller: "reportCTRL",
            sidebarMeta: {
                order: 0
            }
        }).state("viewReport", {
            url: "/viewReport",
            templateUrl: "app/pages/report/report-result/viewReport.html",
            controller: "viewReportCTRL"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.report", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("profile", {
            url: "/profile",
            title: "SIDEMENU_PROFILE",
            templateUrl: "app/pages/profile/profile.html",
            controller: "ProfilePageCtrl"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.profile", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {

    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.task", []).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("controlManagement.equipmentOperations", {
            url: "/equipmentOperations",
            template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: !0,
            title: "SIDEMENU_CONTROLEQUIPMENT",
            sidebarMeta: {}
        }).state("controlManagement.equipmentOperations.addAndEditEquipmentType", {
            url: "/addAndEditEquipmentType",
            templateUrl: "app/pages/task-management/equipment-operations/add-and-edit-equipment-type/add-and-edit-equipment-type.html",
            title: " SIDEMENU_CONTROLEQUIPMENT_ADDEQUIPMENTGROUP",
            sidebarMeta: {
                order: 0
            }
        }).state("controlManagement.equipmentOperations.addAndEditEquipment", {
            url: "/addAndEditEquipment",
            templateUrl: "app/pages/task-management/equipment-operations/add-and-edit-equipment-operations/add-and-edit-equipment-operations.html",
            title: "SIDEMENU_CONTROLEQUIPMENT_EDITANDADDEQUIPMENT",
            sidebarMeta: {
                order: 1
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.task-management", ["ui.select", "ngSanitize"]).config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("user", {
            url: "/user",
            template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: !0,
            title: "SIDEMENU_USEROPERATIONS",
            sidebarMeta: {
                icon: "ion-person-stalker",
                order: 4
            }
        }).state("user.addNewUser", {
            url: "/addNewUser",
            templateUrl: "app/pages/user/add-new-user/add-new-user.html",
            title: "SIDEMENU_USEROPERATIONSADD",
            sidebarMeta: {
                order: 0
            }
        }).state("user.listAndEditUserInformation", {
            url: "/listAndEditUserInformation",
            templateUrl: "app/pages/user/list-and-edit-user-information/list-and-edit-user-information.html",
            title: "SIDEMENU_USEROPERATIONSLISTANDEDIT",
            sidebarMeta: {
                order: 1
            }
        }).state("user.userAuthorisation", {
            url: "/userAuthorisation",
            templateUrl: "app/pages/user/user-authorisation/user-authorisation.html",
            title: "SIDEMENU_USEROPERATIONSAUTHORISATION",
            sidebarMeta: {
                order: 2
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.user", []).config(e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components", [])
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.inputs", [])
}(),
function() {
    "use strict";

    function e(e) {
        e.state("equipmentOperations", {
            url: "/equipmentOperations",
            template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: !0,
            title: "SIDEMENU_CONTROLEQUIPMENT",
            sidebarMeta: {
                icon: "ion-briefcase",
                order: 3
            }
        }).state("equipmentOperations.addAndEditEquipmentType", {
            url: "/addAndEditEquipmentType",
            templateUrl: "app/pages/equipment-operations/add-and-edit-equipment-type/add-and-edit-equipment-type.html",
            title: " SIDEMENU_CONTROLEQUIPMENT_ADDEQUIPMENTGROUP",
            sidebarMeta: {
                order: 0
            }
        }).state("equipmentOperations.addAndEditEquipment", {
            url: "/addAndEditEquipment",
            templateUrl: "app/pages/equipment-operations/add-and-edit-equipment-operations/add-and-edit-equipment-operations.html",
            title: "SIDEMENU_CONTROLEQUIPMENT_EDITANDADDEQUIPMENT",
            sidebarMeta: {
                order: 1
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.equipment-operations", ["ui.select", "ngSanitize"]).config(e)
}(), angular.module("BlurAdmin", ["ngAnimate", "ngCookies", "ui.bootstrap", "ui.sortable", "ui.router", "ngTouch", "toastr", "smart-table", "xeditable", "ui.slimscroll", "pascalprecht.translate", "ngJsTree", "angular-progress-button-styles", "ngMask", "BlurAdmin.pages", "BlurAdmin.login", "BlurAdmin.theme", "btorfs.multiselect", "ngMaterial", "ionic", "ngMessages", "summernote", "ui.select", "BlurAdmin.password", "blockUI"]).constant("addAndEditAssignmentURL", {
        getAssignmentsURL: "/mfc/assignment/getAllAssignments",
        updateAssignmentURL: "/mfc/assignment/updateAssignment",
        numberOfAssignedUserURL: "/mfc/assignment/deleteAssignment",
        addAssignmentURL: "/mfc/assignment/saveAssignment",
        getAllApplicationsURL: "/api/structure/getAllApplications",
        getAllEquipmentTypesURL: "/mfc/equipmentType/getAllEquipmentType",
        deleteAssignmentURL: "/mfc/assignment/deleteUserAssignments"
    }).constant("assignApplicationURL", {
        getUsersURL: "/api/user/getAllUsers",
        getAssignedUserApplicationsURL: "/api/userApplication/getAssignedUsersOfApplication",
        getAllApplicationsURL: "/api/structure/getAllApplications",
        sendUserNewApplication: "/api/userApplication/saveUserApplication",
        permissionForDeleting: "/mfc/userApplication/deletePermission"
    }).constant("assignTaskAndEquipmentURL", {
        getAllApplicationsURL: "/api/structure/getAllApplications",
        getAuthorisedUsersURL: "/mfc/assignment/getAuthorisedUsers",
        getAssignmentsURL: "/mfc/assignment/getAllAssignments",
        getAllEquipmentTypesURL: "/mfc/equipmentType/getAllEquipmentType",
        saveAssigmentsURL: "/mfc/assignment/saveAssignment",
        updateAssigmentsURL: "/mfc/assignment/updateAssignment",
        deleteAssignmentURL: "/mfc/assignment/deleteAssignment",
        getCriticalList: "/mfc/assignment/getCriticalRatioList",
        getUserApplicationsURL: "/mfc/assignment/getUserApplications"
    }).constant("addAndEditControlPointURLs", {
        getControlPointsURL: "/mfc/controlPoint/getAllControlPoints",
        updateControlPointURL: "/mfc/controlPoint/updateControlPoint",
        deleteControlPointURL: "/mfc/controlPoint/deleteControlPoint",
        addControlPointURL: "/mfc/controlPoint/saveControlPoint"
    }).constant("addAndEditEquipmentOperationsURL", {
        getEquipmentURL: "/mfc/equipment/getAllEquipment",
        getEquipmentTypesURL: "/mfc/equipmentType/getAllEquipmentType",
        updateEquipmentURL: "/mfc/equipment/updateEquipment",
        deleteEquipmentURL: "/mfc/equipment/deleteEquipment",
        saveEquipmentURL: "/mfc/equipment/saveEquipment"
    }).constant("addAndEditEquipmentTypeURLs", {
        getEquipmentTypesURL: "/mfc/equipmentType/getAllEquipmentType",
        deleteEquipmentTypeURL: "/mfc/equipmentType/deleteEquipmentType",
        addEquipmentTypeURL: "/mfc/equipmentType/saveEquipmentType"
    }).constant("listLogURLs", {
        getLogsURL: "/mfc/log/getAllDeviceLogs",
        getAllApplicationsURL: "/api/structure/getAllApplications"
    }).constant("paletteURL", {
        newApplicationURL: "/api/structure/saveAnApplication",
        getStructureURL: "/api/structure/getStructure",
        saveStructureURL: "/api/structure/saveStructure",
        getAllComponentsURL: "/api/application/getAllComponents",
        getAllOptionsTypeURL: "/api/application/getAllOptionTypes",
        deleteApplicationURL: "/api/structure/delete",
        getAllValidationTypeURL: "/api/application/getAllValidations",
        getAllEventTypeURL: "/api/application/getAllEvents",
        getAllFunctionTypeURL: "/api/application/getAllFunctionTypes",
        saveFunctionsURL: "/mfc/structure/saveFunction",
        getAllFunctionsURL: "/api/application/getAllFunctions",
        deleteFunctionURL: "/mfc/structure/deleteFunction",
        uploadURL: "/api/file/upload/",
        getUsersApplicationURL: "/mfc/getApplicationDocumentFiles",
        updateFunctionURL: "/mfc/structure/updateFunction",
        sendInfoComponentImages: "/mfc/adminReporter/getFormImages",
        getInputTypes: "/api/application/getInputTypes",
        getApplicationNames: "/api/structure/getStructureNamesBySpec"
    }).constant("addNewUserURLs", {
        addUserURL: "/api/user/create",
        getUsersURL: "/api/user/getAllUsers"
    }).constant("listAndEditUserInformationURLs", {
        getUserInformationsURL: "/api/user/getAllWithSpec",
        updateUserInformationURL: "/api/user/update",
        deleteUserInformationURL: "/api/user/delete"
    }).constant("userAuthorisationURLs", {
        getUsersURL: "/api/user/getAllWithSpec",
        saveUserRolesURL: "/api/user/update",
        getRolesURL: "/api/role/getAllRole"
    }).constant("serverPathURLs", {
        getUploadURL: "/api/file/getFileDownloadPath"
    }).constant("ReportServiceURLs", {
        getReportsURL: "/api/entry/getAllControlMetadata",
        createReportURL: "/mfc/report/createReport",
        getReportResultURL: "/mfc/report/getReportOutputDocument",
        getReportResultStatusURL: "/mfc/report/getReportResultStatus",
        getFormStructureURL: "/api/structure/getApplicationStructure",
        getApplicationsURL: "/api/structure/getStructure",
        getApplicationNamesURL: "/api/structure/getStructureNames",
        saveReportURL: "/mfc/report/saveReport",
        uploadFileToURL: "/api/file/upload/",
        getTemplateParamsURL: "/mfc/report/templateParams",
        getSavedTemplateIdURL: "/mfc/getSavedDocument",
        getApplicationDocumentsURL: "/mfc/report/getApplicationDocuments",
        getApplicationReportParametersURL: "/mfc/report/getApplicationReportParameters",
        uploadURL: "/mfc/uploadReportFile",
        getSelectedFileURL: "/mfc/report/getSelectedFile",
        deleteReportTemplateURL: "/mfc/report/deleteReportTemplate",
        archiveReportURL: "/mfc/report/sendResultIntoArchive",
        sendReportBackURL: "/mfc/report/reassignTask",
        approvedReportURL: "/mfc/report/approveTaskResult",
        exportFormDataURL: "/mfc/export/triggerExport",
        exportFormDataExcelURL: "/mfc/export/triggerPredefinedExcel",
        downloadFormDataURL: "/mfc/export/downloadExport",
        downloadFormDataExcelURL: "/mfc/export/downloadPredefinedExcel",
        getExportableApplicationNamesURL: "/mfc/report/getExportableAppBySpec",
        fileURL: "/mfc/report/getFile"
    }).constant("dashboardURLs", {
        getActiveUsersURL: "/api/dashboard/activeUsers",
        getActiveDevicesURL: "/api/dashboard/activeDevices",
        getCompletedTasksURL: "/api/dashboard/countOfTasks",
        getActiveTasksURL: "/api/dashboard/activeForms",
        getAcviteFormsAndCountsURL: "/api/dashboard/formsAndCounts",
        getCountOfFreeForm: "/api/dashboard/filledFormCountWithoutTask"
    }).constant("dataSourceURLs", {
        getAllDatasource: "/api/application/getAllDatasource",
        saveDataSource: "/mfc/datasource/save",
        validateURI: "/mfc/datasource/validate"
    }).constant("formURLs", {
        getUserApplicationNames: "/api/structure/getStructureNamesofUser",
        getStructureURL: "/api/structure/getStructure",
        sendFormDataURL: "/api/entry/sendFormData",
        sendFormDataDraftURL: "/mfc/services/sendFormData/draft",
        getDataDraftURL: "/mfc/services/sendFormData/getdraft",
        getDatasourceValues: "/mfc/services/getDatasource",
        getTasksURL: "/mfc/assignment/getAssignmentOfUserApplication"
    }).constant("changePasswordURL", "/mfc/user/changePassword").value("Application", {}).constant("deviceURLs", {
        getCompanyDevicesURL: "/services/device/getCompanyDevices",
        saveCompanyDeviceURL: "/services/device/saveCompanyDevice",
        deleteCompanyDeviceURL: "/services/device/deleteCompanyDevice"
    }).constant("taskStatus", {
        COMPLETED: 0,
        INCOMPLETED: 1,
        LATE: 2,
        ONTIME: 3,
        CRITICAL: 4
    }).constant("reportStatus", {
        ACTIVE: 0,
        PASSIVE: 1,
        ARCHIVE: 2
    }).constant("documentType", {
        INFO_PICTURES: "0",
        REPORT: "1",
        MEDIA: "2"
    }).constant("validationType", {
        VALIDATION: 1,
        NOTIFICATION: 0
    }).value("Application", {
        version: {},
        name: "",
        shortName: "",
        id: "",
        description: "",
        pages: [],
        userApplicationId: ""
    }).run(["$cookies", "serviceImplementation", "authenticationURL", "profileURLs", "$uibModal", "serverPathURLs", "$window", "$rootScope", "$filter", "$state", "$translate", "taskStatus", "validationType", function(e, t, a, o, n, i, s, r, l, c, d, p, m) {
        d.use(localStorage.getItem("selectedLanguage")), r.isStatusSet = !1, r.validationType = m, r.taskStatus = p, r.pageHistory = [], r.formData = {}, r.uniqueComponent = [], void 0 === e.get("token") ? s.location = "login.html" : t.service("GET", a.controlTokenURL, {}).then((function() {
            t.service("GET", i.getUploadURL, {}).then((function(t) {
                var a = backendLocation + t.filePath,
                    o = backendLocation + t.imagePath;
                e.put("filePath", a), e.put("imagePath", o)
            }))
        })), r.$on("$stateNotFound", (function(e, t, a, o) {
            c.go("dashboard")
        }))
    }]),
    function() {
        "use strict";

        function e(e, t, a, o, n) {
            return {
                removeCookiesAndLocalStorageVariables: function() {
                    e.remove("token"), e.remove("username"), e.remove("filePath"), e.remove("imagePath"), e.remove("hasAdminRole"), e.remove("userRole"), localStorage.removeItem("selectedLanguage")
                },
                addCookies: function(t, a, o, n) {
                    e.putObject("roles", o), e.put("hasAdminRole", a), e.put("userRole", n), e.put("username", t)
                },
                setUserRoles: function(e, t) {
                    for (var a = !1, o = !1, n = 0; n < t.length; n++) "ADMN" == t[n].shortName && (a = !0), "USR" == t[n].shortName && (o = !0);
                    this.addCookies(e, a, t, o)
                },
                changePreLoaderColor: function() {
                    document.getElementById("preloader").style.background = "rgba(0, 0, 0, 0.50)"
                },
                openConfirmModal: function(e, t) {
                    o.open(e), a.modalMessage = t
                },
                setSelectedFunctions: function(e, t) {
                    for (var a = [], o = 0; o < e.length; o++) e[o].functionType.id == t && a.push(e[o]);
                    return a
                },
                createHTMLForText: function(e) {
                    for (var t = {
                            type: "label",
                            value: "Text",
                            "font-size": 14,
                            bold: !1,
                            underline: !1,
                            italic: !1
                        }, a = "", o = 0; o < e.length; o++) "label" != e[o].name && "paragraph" != e[o].name || (t.type = e[o].name, t.value = e[o].key), "bold" == e[o].name && (t.bold = e[o].key), "italic" == e[o].name && (t.italic = e[o].key), "underline" == e[o].name && (t.underline = e[o].key), "font-size" == e[o].name && (t["font-size"] = e[o].key);
                    var i = "",
                        s = "";
                    return "true" == t.bold && (i += "<b>", s += "</b>"), "true" == t.underline && (i += "<u>", s += "</u>"), "true" == t.italic && (i += "<i>", s += "</i>"), a = "label" == t.type ? ' <label style="font-size:' + t["font-size"] + 'px">' + i + t.value + s + "</label>" : ' <p style="font-size:' + t["font-size"] + 'px">' + i + t.value + s + "</p>", n.trustAsHtml(a)
                },
                createHTMLForImage: function(e) {
                    for (var t = "", a = "100", o = "", i = 0; i < e.length; i++) "imageSource" == e[i].name ? t = e[i].key : "imageWidth" == e[i].name ? a = e[i].key : "imageHeight" == e[i].name && (o = e[i].key);
                    var s = "<img width='" + a + "' height='" + o + "' src='" + t + "'/>";
                    return n.trustAsHtml(s)
                }
            }
        }
        e.$inject = ["$cookies", "$location", "$rootScope", "$uibModal", "$sce"], angular.module("BlurAdmin.login").factory("Core", e)
    }(),
    function() {
        "use strict";

        function e(e, t, a, o, n, i, s, r, l) {
            return {
                service: function(n, s, r, c) {
                    console.log("Service method:" + n + " param:", r + " data:", c, " bu dosya yolu(/mfc/user/getUser) ", s, "ve bu site adresi(http://natilus.invisoapp.com.tr)", i);
                    var d = t.defer();
                    void 0 === r && (r = {}), void 0 === c && (c = {});
                    var p = "Bearer " + o.get("token");
                    return e({
                        method: n,
                        url: i + s,
                        params: r,
                        data: c,
                        headers: {
                            Authorization: p
                        }
                    }).then((function(e) {
                        var t = e.data;
                        d.resolve(t)
                    }), (function(e) {
                        "401" != e.status || a.isStatusSet || (a.isStatusSet = !0, l.open({
                            backdrop: "static",
                            animation: !1,
                            controller: "loginModalCtrl",
                            templateUrl: "app/pages/loginModal/loginModal.html"
                        })), d.reject(e)
                    })), d.promise
                },
                getFile: function(n, s, r, c) {
                    var d = t.defer();
                    void 0 === r && (r = {}), void 0 === c && (c = {});
                    var p = "Bearer " + o.get("token");
                    return console.log("In service  tokenHeader:" + p), e({
                        method: n,
                        url: i + s,
                        params: r,
                        data: c,
                        headers: {
                            Accept: "application/octet-stream",
                            Authorization: p
                        }
                    }).then((function(e) {
                        var t = e.data;
                        d.resolve(t)
                    }), (function(e) {
                        "401" != e.status || a.isStatusSet || (a.isStatusSet = !0, l.open({
                            backdrop: "static",
                            animation: !1,
                            controller: "loginModalCtrl",
                            templateUrl: "app/pages/loginModal/loginModal.html"
                        })), d.reject(e)
                    })), d.promise
                },
                uploadService: function(a, q, n) {
                    var p = "Bearer " + o.get("token");
                    var s = t.defer();
                    q = i + q;
                    var r = new FormData;
                    return r.append("file", a), e.post(q, r, {
                        transformRequest: angular.identity,
                        headers: {
                            "Content-Type": void 0,
                            Accept: "text/plain",
                            Authorization: p
                        },
                        params: n
                    }).success((function(e) {
                        var t = e.data;
                        s.resolve(e), console.log("File upload is successful.")
                    })).error((function(e) {
                        s.reject(e), console.log("File upload is failed.")
                    })), s.promise
                },
                serviceWithoutToken: function(a, o, n, s, r) {
                    var l = t.defer();
                    return void 0 === n && (n = {}), void 0 === s && (s = {}), e({
                        method: a,
                        url: ("custom" == r ? "" : void 0 !== r ? r : i) + o,
                        params: n,
                        data: s
                    }).then((function(e) {
                        var t = e.data;
                        l.resolve(t)
                    }), (function(e) {
                        l.reject(e)
                    })), l.promise
                }
            }
        }
        e.$inject = ["$http", "$q", "$rootScope", "$cookies", "Core", "connectionConfigURL", "authenticationHeader", "$window", "$uibModal"], angular.module("BlurAdmin.login").factory("serviceImplementation", e)
    }();
var translationsEN = {
        CHANGE_BUTTON: "Change",
        CREATE_BUTTON: "Create",
        BACK_BUTTON: "Back",
        CLEAR_BUTTON: "Clear",
        ADD_BUTTON: "Add",
        SAVE_BUTTON: "Save",
        ARCHIVE_BUTTON: "Archive",
        REFRESH_BUTTON: "Refresh",
        UPDATE_BUTTON: "Update",
        TABLE_CANCELBUTTON: "Cancel",
        TABLE_DELETEBUTTON: "Delete",
        TABLE_REMOVEFILTERBUTTON: "Remove Filter",
        TABLE_EDITBUTTON: "Edit",
        TABLE_OKEYBUTTON: "Ok",
        TABLE_SEARCHBUTTON: "Search",
        TABLE_ROWSONPAGE: "Rows on page",
        CONFIRM_YESBUTTON: "Yes",
        CONFIRM_NOBUTTON: "No",
        REQUIREDFIELD_ERROR: "This field is required.",
        VALIDFIELD_ERROR: "Please enter valid T.C. number.",
        VALIDEMAIL_ERROR: "Please enter valid email.",
        VALIDPHONEFIELD_ERROR: "Please enter valid phone number.",
        EMAILEXIST_ERROR: "This e-mail address is already in use.",
        USEREXISTS_ERROR: "This user already exists.",
        USERNAMEEXISTS_ERROR: "This username is already in use.",
        USERTCNOEXIST_ERROR: "This T.C. number is already in use.",
        USERPAGE_USERINFOHEADER: "User Information",
        USERPAGE_USERUSERNAMEHEADER: "Username",
        USERPAGE_USERNAMEHEADER: "Name",
        USERPAGE_USERSURNAMEHEADER: "Surname",
        USERPAGE_USERTCNOHEADER: "T.C. Number",
        USERPAGE_USERCOMPANYNAMEHEADER: "Company",
        USERPAGE_USEROCCUPATIONHEADER: "Occupation",
        USERPAGE_CONTACTINFOHEADER: "Contact Information",
        USERPAGE_CONTACTEMAILHEADER: "E-Mail",
        USERPAGE_CONTACTPHONEHEADER: "Phone Number",
        USERPAGE_CONTACTADDRESSHEADER: "Address",
        USERPAGE_USERROLEHEADER: "Role",
        USERPAGE_ADDUSERBUTTON: "SAVE",
        USERPAGE_ADDSUCCESSMESSAGE: "User is added successfully.",
        USERPAGE_ADDERRORMESSAGE: "An error occured while trying to add user.",
        USERPAGE_UPDATESUCCESSMESSAGE: "User information are successfully updated.",
        USERPAGE_UPDATEERRORMESSAGE: "An error occured while trying to update user information.",
        USERPAGE_DELETESUCCESSMESSAGE: "User is deleted successfully.",
        USERPAGE_DELETEERRORMESSAGE: "An error occured while trying to delete user.",
        USERPAGE_AUTHORISATIONSUCCESSMESSAGE: "User is authorised successfully.",
        USERPAGE_AUTHORISATIONERRORMESSAGE: "An error occured while trying to authorise user.",
        ASSIGNUSERTOAPPLICATION_FORMS: "All Forms",
        ASSIGNUSERTOAPPLICATION_USERS: "All Users",
        ASSIGNUSERTOAPPLICATION_TOGGLEALL: "Toggle all",
        ASSIGNUSERTOAPPLICATION_ADDBUTTON: "Add",
        ASSIGNUSERTOAPPLICATION_REMOVEBUTTON: "Remove",
        ASSIGNUSERTOAPPLICATION_ASSIGNEDUSERS: "Authenticated Users for Selected Form",
        ASSIGNUSERTOAPPLICATION_SAVEBUTTON: "Save",
        ASSIGNUSERTOAPPLICATION_NOSELECTION: "No selection",
        ASSIGNUSERTOAPPLICATION_ADDSUCCESSMESSAGE: "Users are successfully assigned to form.",
        ASSIGNUSERTOAPPLICATION_ADDERRORMESSAGE: "An error occured while trying to assign.",
        ASSIGNTASKPAGE_ASSIGNBUTTON: "Assign Task",
        ASSIGNTASKPAGE_TABLENAME: "Form",
        ASSIGNTASKPAGE_TABLEUSERS: "User",
        ASSIGNTASKPAGE_TABLETASK: "Task Name",
        ASSIGNTASKPAGE_TABLEVERSION: "Version",
        ASSIGNTASKPAGE_TABLEDESCRIPTION: "Task Description",
        ASSIGNTASKPAGE_TABLEBARCODE: "Product Number",
        ASSIGNTASKPAGE_TABLEEQUIPMENT: "Equipment Group",
        ASSIGNTASKPAGE_TABLESTARTDATE: "Assignment Date",
        ASSIGNTASKPAGE_TABLEEXPIREDATE: "Expire Date",
        ASSIGNTASKPAGE_TABLETASK_STATUS: "Status",
        ASSIGNTASKPAGE_MODALMESSAGE: "Are you sure to delete the task which is still active?",
        ASSIGNTASKPAGE_MODALDELETESUCCESSMESSAGE: "The task is deleted successfully.",
        ASSIGNAPPLICATIONPAGE_MODALMESSAGE: "Are you sure to delete the task which is still active?",
        ASSIGNTASKPAGE_ADDSUCCESSMESSAGE: "The task is added successfully.",
        ASSIGNTASKPAGE_ADDERRORMESSAGE: "An error occured while trying to add task.",
        ASSIGNTASKPAGE_UPDATESUCCESSMESSAGE: "The task is updated successfully.",
        ASSIGNTASKPAGE_UPDATEERRORMESSAGE: "An error occured while trying to update task.",
        ASSIGNTASKPAGE_DELETESUCCESSMESSAGE: "The task is deleted successfully.",
        ASSIGNTASKPAGE_DELETEERRORMESSAGE: "An error occured while trying to delete task.",
        ASSIGNTASKPAGE_ERROR_MESSAGE_DATA_COMPARE: "Enter the task expire date as it will be larger than the assignment date.",
        ASSIGNTASKPAGE_DEFAULT_SELECT_TEXT: "- Select Equipment Group -",
        ASSIGNTASKPAGE_TAB_1: "Form Information",
        ASSIGNTASKPAGE_TAB_2: "Task Information",
        ASSIGNTASKPAGE_TAB_3: "Equipment Information",
        ASSIGNTASKPAGE_MULTISELECT_DEFAULT: "No selection",
        ASSIGNTASKPAGE_MULTISELECT_COUNT: " Selected form count: ",
        ADDEQUIPMENTPAGE_TABLENAME: "Name",
        ADDEQUIPMENTPAGE_TABLEDESCRIPTION: "Description",
        ADDEQUIPMENTPAGE_TABLESERIALNUMBER: "Equipment Serial Number",
        ADDEQUIPMENTPAGE_TABLEEQUIPMENTTYPE: "Equipment Group",
        ADDEQUIPMENTPAGE_SEARCHNAME: "Search Name",
        ADDEQUIPMENTPAGE_SEARCHDESCRIPTION: "Search Description",
        ADDEQUIPMENTPAGE_SEARCHSERIALNUMBER: "Search Serial Number",
        ADDEQUIPMENTPAGE_SEARCHEQUIPMENTTYPE: "Search Equipment Group",
        ADDEQUIPMENTPAGE_ADDSUCCESSMESSAGE: "Equipment is added successfully.",
        ADDEQUIPMENTPAGE_ADDERRORMESSAGE: "An error occured while trying to add equipment.",
        ADDEQUIPMENTPAGE_UPDATESUCCESSMESSAGE: "Equipment is updated successfully.",
        ADDEQUIPMENTPAGE_UPDATEERRORMESSAGE: "An error occured while trying to update equipment.",
        ADDEQUIPMENTTYPEPAGE_WARNINGMESSAGE: "This equipment group has been assigned to task/tasks. It can not be deleted.",
        ADDEQUIPMENTPAGE_DELETESUCCESSMESSAGE: "Equipment is deleted successfully.",
        ADDEQUIPMENTPAGE_DELETEERRORMESSAGE: "An error occured while trying to delete equipment.",
        ADDEQUIPMENTTYPEPAGE_ADDSUCCESSMESSAGE: "Equipment group is added successfully.",
        ADDEQUIPMENTTYPEPAGE_ADDERRORMESSAGE: "An error occured while trying to add equipment group.",
        ADDEQUIPMENTTYPEPAGE_DELETESUCCESSMESSAGE: "Equipment group is deleted successfully.",
        ADDEQUIPMENTTYPEPAGE_DELETEERRORMESSAGE: "An error occured while trying to delete equipment group.",
        ADDEQUIPMENTTYPEPAGE_EXISTERROR: " named equipment group is already exist.",
        LISTLOG_SEARCHMESSAGE: "Search Message",
        LISTLOG_FILTER: "Filters",
        LISTLOG_FILTERAPPLICATION: "All Forms",
        LISTLOG_FILTERENVIRONMENT: "All Environments",
        LISTLOG_FILTERLEVEL: "All Levels",
        LISTLOG_SEARCHSTARTDATE: "Start Date",
        LISTLOG_SEARCHENDDATE: "End Date",
        LISTLOG_TABLETIMESTAMP: "Timestamp",
        LISTLOG_TABLEAPPLICATIONVERSION: "Form Version",
        LISTLOG_TABLEAPPLICATION: "Form",
        LISTLOG_DEVICEID: "Device ID",
        LISTLOG_TABLEENVIRONMENT: "Environment",
        LISTLOG_TABLELEVEL: "Level",
        LISTLOG_TABLEMESSAGE: "Message",
        PROFILE_USERHEADER: "User Information",
        PROFILE_NAME: "Name",
        PROFILE_SURNAME: "Surname",
        PROFILE_USERNAME: "Username",
        PROFILE_TC: "T.C. Number",
        PROFILE_COMPANY: "Company Name",
        PROFILE_OCCUPATION: "Occupation",
        PROFILE_CONTACTHEADER: "Contact Information",
        PROFILE_EMAIL: "Email",
        PROFILE_ADDRESS: "Address",
        PROFILE_PHONE: "Phone",
        REPORT_DOCUMENTMODAL_TABLENAME: "Document Name",
        APPLICATIONPAGE_FORMLISTNAME: "Forms",
        APPLICATIONPAGE_ADDNEWFORMBUTTON: "Create New Form",
        APPLICATIONPAGE_OPENSELECTEDADPP: "Open",
        APPLICATIONPAGE_APPCURRENTVERSION: "Current Version",
        APPLICATIONPAGE_APPCREATEDBY: "Created By",
        APPLICATIONPAGE_FORMTYPE: "Form Type",
        APPLICATIONPAGE_FREEFORM: "Free Form",
        APPLICATIONPAGE_ASSIGNMENTREQUIRED: "Assignment Required Form",
        APPLICATIONPAGE_APPCREATEDAT: "Created At",
        APPLICATIONPAGE_APPDESCRIPTION: "Description",
        APPLICATIONPAGE_APPUPDATEDAT: "Updated At",
        APPLICATIONPAGE_APPNAME: "Name",
        APPLICATIONPAGE_APPDELETE: "Delete",
        APPLICATIONPAGE_APPUPDATE: "Update",
        APPLICATIONPAGE_APPSAVE: "Save",
        APPLICATIONPAGE_APPCLEAR: "Cancel",
        APPLICATIONPAGE_APPSEARCH: "Search",
        APPLICATIONPAGE_APPGETERROR: "An error occured while trying to show forms.",
        PALETTE_BEFORERELOAD_ERRORMESSAGE: "The changes you made will be lost.",
        PALETTE_SAVE: "Save",
        PALETTE_GALLERY: "Gallery",
        PALETTE_PALETTE: "Palette",
        PALETTE_PROPERTIES: "Properties",
        PALETTE_DELETE: "Delete",
        PALETTE_ADDVALIDATION: "Add Validation",
        PALETTE_ADDEVENT: "Add Event",
        PALETTE_INFOCONTENT: "Content",
        PALETTE_TABFUNCTION: "Add Function",
        PALETTE_MUSTPICKHOMEPAGE: "Please select a page as the home page.",
        PALETTE_MUSTPICKUNIQUEID: "Please select at least one unique field.",
        PALETTE_MUSTADDNAVIGATIONFUNCTION: "Add function to navigation is required.",
        PALETTE_APPLICATIONSAVEDERROR: "The form could not be saved.",
        PALETTE_SAVESUCCESSMESSAGE: "Application is successfully saved.",
        PALETTE_SAVEERRORMESSAGE: "An error occured when trying to save application.",
        PALETTE_ADDNAVIGATIONTABTOFUNCTION_SUCCESSMESSAGE: "Event is successfully saved.",
        SAVE_ON_PROGRESS: "Please wait until the process finished...",
        PALETTE_ERRORMESSAGE_INSERTGRID: "Please drop a grid to this area.",
        PALETTE_ERRORMESSAGE_INSERTFORM: "Please drop a section to this area.",
        PALETTE_ERRORMESSAGE_INSERTCOLUMN: "Please drop a form components to this area.",
        PALETTE_ERRORMESSAGE_INSERTNAVIGATIONORFORM: "Please drop a section or navigation tab to this area.",
        PALETTE_MULTISELECT_TEXT: "Select",
        VALIDATIONMODAL_SELECTED: "Created Validations",
        VALIDATIONMODAL_NAME: "Name",
        VALIDATIONMODAL_VALUE: "Value",
        VALIDATIONMODAL_ERRORMESSAGE: "Error Message",
        NEWAPPMODAL_APPNAME: "Form Name",
        NEWAPPMODAL_APPDESCRIPTION: "Description",
        NEWAPPMODAL_APPSUCCESS: "Form is successfully created.",
        NEWAPPMODAL_APPFAIL: "An error occured while trying to create form.",
        NEWAPPMODAL_SELECTFORM: "Select existing form",
        NEWAPPMODAL_FORMLIST: "Forms",
        NEWAPPMODAL_CREATEBUTTON: "Create",
        NEWPAGEMODAL_PAGETITLE: "Page Name",
        NEWPAGEMODAL_OKBUTTON: "OK",
        NEWAPPMODAL_FORMTYPE: "Form Type",
        ADDEVENT_TABEVENT: "Add Event",
        ADDEVENT_TABFUNCTION: "Add Function",
        ADDEVENT_EVENTLIST: "Event List",
        ADDEVENT_SEARCHINPUT: "Search Event",
        ADDFUNCTION_LIST: "Function List",
        ADDFUNCTION_SEARCHFUNCTION: "Search Function",
        ADDFUNCTION_NAME: "Function Name",
        ADDFUNCTION_FUNCTIONDETAIL: "Function Detail",
        ADDFUNCTION_NAVIGATEDPAGE: "Pages",
        ADDFUNCTION_SEARCHPAGE: "Search Page",
        ADDFUNCTION_SUCCESSMESSAGE: "Function is successfully saved.",
        ADDFUNCTION_ERRORMESSAGE: "Problem occured while trying to save function information.",
        UPDATEFUNCTION_SUCCESSMESSAGE: "Function is successfully updated.",
        UPDATEFUNCTION_ERRORMESSAGE: "Problem occured while trying to update function information.",
        ADDEVENTMODAL_TYPE: "Event Name",
        ADDEVENTMODAL_FUNCTIONTYPE: "Function Type",
        ADDEVENTMODAL_SEARCHFUNCTION: "Search Function Type",
        ADDEVENTMODAL_FUNCTIONS: "Functions",
        ADDEVENT_ADDBUTTON: "Add",
        ADDEVENT_DELETENAVIGATIONTABBUTTON: "Delete",
        ADDEVENT_SAVEBUTTON: "Save",
        ADDEVENT_CLEARBUTTON: "Clear",
        ADDVALIDATION_ADDBUTTON: "Add",
        ADDVALIDATION_SAVEBUTTON: "Save",
        ADDVALIDATION_CLEARBUTTON: "Clear",
        CONFIRMDELETE_USER_MESSAGE: "Are you sure that you want to permanently delete the selected user.",
        CONFIRMDELETE_MESSAGE: "Are you sure you want to delete? ",
        CONFIRMDELETE_YES: "Yes",
        CONFIRMDELETE_NO: "No",
        CONFIRMBEFORECLOSINGTHEADITOR_MESSAGE: "Do you want to save changes before closing the editor?",
        CONFIRMBEFORECLOSINGTHEADITOR_CLOSE: "Close the editor",
        CONFIRMBEFORECLOSINGTHEADITOR_CLOSEANDSAVE: "Close and Save",
        CONFIRMBEFORECLOSINGTHEADITOR_CLOSEWITHOUTSAVE: "Close without Save",
        CONFIRMBEFORECLOSINGTHEADITOR_APPSUCCESSDELETE: "Application is successfully deleted.",
        CONFIRMBEFORECLOSINGTHEADITOR_APPFAILDELETE: "An error occured while trying to delete application.",
        ADDFUNCTIONDETAILMODAL_NAME: "Name",
        ADDFUNCTIONDETAILMODAL_DETAIL: "Function Detail",
        DASHBOARD_PAGETOP_LOGOUT: "Sign Out",
        DASHBOARD_PAGETOP_PROFILE: "Profile",
        DASHBOARD_CONTENTTOP_HOME: "Home",
        ADMINLOGINPAGE_HEADER: "INVISO Admin Application",
        DASHBOARD_LEFTMENU_PALETTE: "Palette",
        DASHBOARD_LEFTMENU_DEVICELOG: "Device Log",
        DASHBOARD_LEFTMENU_USER: "",
        DASHBOARD_LEFTMENU_EQUIPMENT: "Equipment",
        DASHBOARD_LEFTMENU_CONTROL: "",
        DASHBOARD_LEFTMENU_REPORT: "Report",
        USERAUTHORISATION_TABLENAME: "Name",
        USERAUTHORISATION_TABLESURNAME: "Surname",
        USERAUTHORISATION_TABLEUSERNAME: "Username",
        USERAUTHORISATION_TABLEROLE: "Role",
        USERAUTHORISATION_SEARCHNAME: "Search Name",
        USERAUTHORISATION_SEARCHSURNAME: "Search Surname",
        USERAUTHORISATION_SEARCHUSERNAME: "Search Username",
        USERAUTHORISATION_SEARCHROLE: "Search Role",
        REPORTDESIGN_CHOOSEAPP: "Choose the form to create a report",
        REPORTDESIGN_CONTINUE: "Continue",
        REPORTDESIGN_TEMPLATEURL: "Template URL",
        REPORTDESIGN_ADDFILE: "Add File",
        REPORTDESIGN_UPLOADFILE: "Upload File",
        REPORTDESIGN_UPLOADFILEBUTTON: "Upload",
        REPORTDESIGN_UPLOADFILEWARNING: "An error occurred while trying to upload file.",
        REPORTDESIGN_UPLOADFILESUCCESS: "The file is uploaded successfully.",
        REPORTDESIGN_TIPS: "Tips",
        REPORTDESIGN_TAB1: "FORM",
        REPORTDESIGN_TAB2: "TEMPLATE",
        REPORTDESIGN_TAB3: "DESIGN",
        REPORTDESIGN_SAVE: "Save",
        REPORTDESIGN_BACK: "Back",
        REPORTDESIGN_REPORTDATA: "Report Data",
        REPORTDESIGN_FORMDATA: "Form Data",
        REPORTDESIGN_SELECTEDTEMPLATE: "Selected Template",
        REPORTDESIGN_ADDNEWROW: "Add New Row",
        REPORTDESIGN_EDITROWBUTTON: "Edit",
        REPORTDESIGN_DELETEROWBUTTON: "Delete",
        REPORTDESIGN_UPDATEROWBUTTON: "Update",
        REPORTDESIGN_SAVEROWBUTTON: "Save",
        REPORTDESIGN_TEMPLATE_ADDBUTTON: "Add New",
        REPORTDESIGN_TEMPLATE_DELETEBUTTON: "Delete",
        REPORTDESIGN_CANCELROWBUTTON: "Cancel",
        REPORTDESIGN_REPORTSAVESUCCESS: "Report is successfully saved.",
        REPORTDESIGN_REPORTSAVEFAIL: "An error occurred while trying to save report.",
        REPORTDESIGN_REPORTSAVECONFIRMMESSAGE: "Are you sure to save the design?",
        REPORTDESIGN_ADDSAMEFILEERROR: "This file is already exist.",
        REPORTDESIGN_FILEFORMATERROR: "File extension should be .docx, .doc or .odt",
        REPORTDESIGN_TAB2HEADER: "Please add one or more template file into the list.",
        REPORTDESIGN_SELECTEDCOLUMN: "Selected Document",
        REPORTDESIGN_DEFAULTVALUE: "No Selection",
        REPORTDESIGN_UPDATEDOCCONFIRMMESSAGE: "Old parameter mappings may changed by uploading new template document. Are you sure to renew this document?",
        REPORTRESULT_TRANSACTIONDATE: "Transaction Date",
        REPORTRESULT_ASSIGNMENTDATE: "Assignment Date",
        REPORTDESIGN_UNCOMITTEDROW_ERROR: "There are unsaved rows. Please save your changes before go back.",
        REPORTRESULT_USERNAME: "Username",
        REPORTRESULT_TASK: "Task",
        REPORTRESULT_UNIQUEID: "Unique ID",
        REPORTRESULT_REPORT: "Report",
        REPORTRESULT_DETAIL: "Detail",
        REPORTRESULT_SEARCH: "Search",
        REPORTRESULT_STATUS: "Status",
        REPORTRESULT_LOCATION: "Location",
        REPORTRESULT_FORM: "Form",
        REPORTRESULT_ERRORMESSAGE: "An error occured while trying to get all reports.",
        REPORT_EXPORT_BUTTON: "Trigger CSV",
        REPORT_DOWNLOAD_BUTTON: "Download Last CSV Report",
        REPORT_EXPORT_EXCEL_BUTTON: "Trigger Excel",
        REPORT_DOWNLOAD_EXCEL_BUTTON: "Download Last Excel Report",
        LINK_SHOWLOCATION: "Show Location",
        MULTISELECT_BUTTONNAME: "Select",
        DASHBOARD_PAGETOP_LOGOUT: "Sign Out",
        DASHBOARD_PAGETOP_PROFILE: "Profile",
        DASHBOARD_CONTENTTOP_HOME: "Home",
        DASHBOARD_LEFTMENU_PALETTE: "Palette",
        DASHBOARD_LEFTMENU_DEVICELOG: "Device Log",
        DASHBOARD_LEFTMENU_USER: "",
        DASHBOARD_LEFTMENU_EQUIPMENT: "Equipment",
        DASHBOARD_LEFTMENU_CONTROL: "",
        DASHBOARD_LEFTMENU_REPORT: "Report",
        DASHBOARD_PIECHART_ACTIVEUSER: "ACTIVE USERS",
        DASHBOARD_PIECHART_ACTIVEDEVICE: "ACTIVE DEVICES",
        DASHBOARD_PIECHART_CRITICALTASK: "ACTIVE FORMS",
        DASHBOARD_PIECHART_COMPLETEDTASK: "Completed Tasks",
        DASHBOARD_CHARTNAME: "Forms",
        SIDEMENU_MORE: "More",
        SIDEMENU_FORM_MANAGEMENT: "Form Management",
        SIDEMENU_DATASOURCE: "Datasource",
        SIDEMENU_DEVICE: "Devices",
        SIDEMENU_TASK: "My Tasks",
        SIDEMENU_HOME: "Home",
        SIDEMENU_FORMS: "My Forms",
        SIDEMENU_PALETTE: "Palette",
        SIDEMENU_PROFILE: "Profile",
        SIDEMENU_DEVICELOG: "Device Log",
        SIDEMENU_USEROPERATIONS: "User Operations",
        SIDEMENU_USEROPERATIONSADD: "Add User",
        SIDEMENU_USEROPERATIONSLISTANDEDIT: "List And Edit User",
        SIDEMENU_USEROPERATIONSAUTHORISATION: "User Authorisation",
        SIDEMENU_CONTROLEQUIPMENT: "Control Equipment",
        SIDEMENU_CONTROLEQUIPMENT_ADDEQUIPMENTGROUP: "Add Equipment Group",
        SIDEMENU_CONTROLEQUIPMENT_EDITANDADDEQUIPMENT: "Add And List Equipment",
        SIDEMENU_CONTROLMANAGEMENT: "Task Management",
        SIDEMENU_CONTROLMANAGEMENT_ASSIGNAPPLICATION: "Assign Form",
        SIDEMENU_CONTROLMANAGEMENT_ASSIGNTASK: "Assign Task",
        SIDEMENU_REPORT: "Report",
        SIDEMENU_REPORT_RESULT: "Report Results",
        SIDEMENU_REPORT_DESIGNREPORT: "Design Report",
        SIDEMENU_REPORT_FORMDATA_EXPORT: "Export Form Data",
        MENU_CHANGEPASSWORD: "Change Your Password",
        LOGINPAGE_USERNAME: "Username",
        LOGINPAGE_PASSWORD: "Password",
        LOGINPAGE_SIGNUP: "Login",
        LOGINPAGE_LANGUAGESELECT_TR: "Turkish",
        LOGINPAGE_LANGUAGESELECT_EN: "English",
        LOGINPAGE_ERROR_EMPTYFIELD: "Please fill in all fields.",
        LOGINPAGE_ERROR_WRONGUSERORPASSWORD: "Username or password is wrong. Try again.",
        STATIC_FUNCTIONS: "Static Functions",
        USER_DEFINED_FUNCTIONS: "User Defined Functions",
        NAVIGATION_FUNCTIONS: "Navigation Functions",
        TOOLTIP_DEVICELOG_TIMESTAMP: "Timestamp of the operation that specified with log message",
        TOOLTIP_DEVICELOG_APPVERSION: "Current version of the form which is on the device and worked on",
        TOOLTIP_DEVICELOG_APPLICATION: "The form which is on the device and worked on.",
        TOOLTIP_DEVICELOG_ENVIRONMENT: "Operating System of the device worked on",
        TOOLTIP_DEVICELOG_LEVEL: "Log messages are notified with different weigths. 'Fatal' and 'Error' means there is a problem, other ones take aim that give some information",
        TOOLTIP_DEVICELOG_MESSAGE: "Content of log message",
        TOOLTIP_DEVICELOG_DEVICEID: "Device's unique idendifier",
        TOOLTIP_USEROPERATIONS_USERAUTHORISATION: "'ADMIN' can do all operations in Inviso-Admin and device. 'REPORTER' can design reports and shows report results. 'SUPERVISOR' is responsible from task operations. 'USER' just can login to device application and complete assigned forms",
        TOOLTIP_ADDEQUIPMENTGROUP_TABLENAME: "Create an group to put equipments together which will use for same purpose",
        TOOLTIP_ADDEQUIPMENT_TABLENAME: "Given name for equipment",
        TOOLTIP_ADDEQUIPMENT_TABLEDESCRIPTION: "Detail information for equipment",
        TOOLTIP_ADDEQUIPMENT_SERIALNUMBER: "Equipment's unique identifier",
        TOOLTIP_ADDEQUIPMENT_EQUIPMENTTYPE: "Include adding equipment into equipment group that previously created",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLENAME: "List of all forms in the application",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEVERSION: "Current version of selected form",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEUSERS: "List of users who are previously authorized on selected form in 'Assign Form' menu",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLETASK: "Name of task",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEDESCRIPTION: "Detail information of task",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEBARCODE: "Unique identifier of the product which is expected to control during the task",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEEQUIPMENT: "The group of control equipments that are specified using on task",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLESTARTDATE: "Expected date to start the task",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_STATUS: "Current status of task",
        TOOLTIP_REPORT_REPORTRESULT_TRANSACTIONDATE: "Form submitting date",
        TOOLTIP_REPORT_REPORTRESULT_ASSIGNMENTDATE: "Assign date of task that if the form came and completed with a task",
        TOOLTIP_REPORT_REPORTRESULT_USERNAME: "The user who submited the form",
        TOOLTIP_REPORT_REPORTRESULT_FORM: "Filled and submitted form on device",
        TOOLTIP_REPORT_REPORTRESULT_TASK: "Name of task that if the form came and completed with a task",
        TOOLTIP_REPORT_REPORTRESULT_UNIQUEID: "Unique field/fields on form",
        TOOLTIP_REPORT_REPORTRESULT_REPORT: "Create report documents from filled form",
        TOOLTIP_REPORT_REPORTRESULT__LOCATION: "It contains location information where the form is filled",
        TOOLTIP_REPORT_REPORTRESULT_DETAIL: "All pages of filled form",
        TOOLTIP_REPORT_DESIGNREPORT_TEMPLATEURL: "Downloadable template document after uploading",
        TOOLTIP_REPORT_DESIGNREPORT_ADDFILE: "Pick a file from your pc before upload it into the server",
        TOOLTIP_REPORT_DESIGNREPORT_UPLOADFILE: "Upload your file into the server",
        TOOLTIP_REPORT_DESIGNREPORT_REPORTDATA: "Droppable fields of your selected template file with spesified tags",
        TOOLTIP_REPORT_DESIGNREPORT_FORMDATA: "All pages of selected application with draggable components",
        TOOLTIP_PALETTE_ADDNEWFORM_FORMTYPE: "Assignment required form means that form must assign to the task before submit.Free form means that you don't have to assign form to task",
        TOOLTIP_PALETTE_ADDNEWFORM_SELECTEXISTINGFORM: "When you clicked the link you can extend new form from existed forms",
        TOOLTIP_PALETTE_SELECTBOX: "Openable box which you can add multiple options into it and select one of them",
        TOOLTIP_PALETTE_CHECKBOX: "It allows to make one or more choices among many options",
        TOOLTIP_PALETTE_RADIOBUTTON: "It allows to only one choices among many options",
        TOOLTIP_PALETTE_CAMERA: "If the device has a camera feature, it opens the camera and allows you to take pictures",
        TOOLTIP_PALETTE_CAMERANDNOTE: "If the device has a camera feature, it opens the camera and allows to add detail on captured picture",
        TOOLTIP_PALETTE_NAVIGATION: "It allows to move forward / backward on different pages on the form",
        TOOLTIP_PALETTE_INFO: "It allows to open an info message window where you can add pictures or details when you click",
        TOOLTIP_PALETTE_BARCODEREADER: "It opens the camera of the device and allows the barcodes to be read and sent to the form",
        TOOLTIP_PALETTE_INPUT: "It allows to insert a single-line field where text can be entered on the form",
        TOOLTIP_PALETTE_BUTTON: "You can use this component to define and run functions in the form. For example, by adding a button to the page, you can switch between pages with the navigation function",
        TOOLTIP_PALETTE_TEXTAREA: "It allows to add a field with multiple lines where text can be entered on the form",
        TOOLTIP_PALETTE_STATICTEXT: "It allows to add readonly view title or description to the form",
        TOOLTIP_PALETTE_MULTISELECT: "Openable box which you can add multiple options into it and select one or more of them",
        TOOLTIP_PALETTE_GRID: "'Grid' must be added to the page before adding the components on the palette to the form. You can place the submenu components on the grid",
        TOOLTIP_PALETTE_PROPERTIES_UNIQUE: "It provides unique forms which helps you to find your reports on 'Report Result' page",
        TOOLTIP_PALETTE_ADDVALIDATIONLINK: "It provides to validate form's data on the client's computer before sending it to the web server ",
        TOOLTIP_PALETTE_ADDEVENTLINK: "",
        TOOLTIP_PALETTE_ADDEVENT_EVENTNAME: "Events are 'things' that happen to HTML elements",
        TOOLTIP_PALETTE_ADDEVENT_FUNCTIONTYPE: "Static functions are a type of function that cannot be modified by user and have such as saving the form as a draft or sending it to a service methods.User-defined functions are the type of function that the user creates on the 'Add Function' tab.Navigation functions are a type of function that allow page routing to be made via navigation component",
        TOOLTIP_PALETTE_ADDEVENT_FUNCTIONS: "Functions are methods that specify what happens to events on HTML elements when they occur",
        TOOLTIP_PALETTE_ADDFUNCTION_FUNCTIONNAME: "It defines name of function which is used in user-defined function type",
        TOOLTIP_PALETTE_ADDFUNCTION_FUNCTIONDETAIL: "When the events defined on the HTML elements occur (click, change, etc.), function detail specifies what to on that form element and where Javascript code is written",
        TOOLTIP_PALETTE_ADDFUNCTION_PAGES: "",
        TOOLTIP_PALETTE_ADDVALIDATION_NAME: "It contains that name of validations which are defined on form elements",
        TOOLTIP_PALETTE_ADDVALIDATION_VALUE: "Identifies the value of the selected validation",
        TOOLTIP_PALETTE_ADDVALIDATION_ERRORMESSAGE: "It contains the message when no validation is provided",
        LISTANDEDITUSER_SEARCHNAME: "Search Name ",
        LISTANDEDITUSER_SEARCHSURNAME: "Search Surname",
        LISTANDEDITUSER_SEARCHTCNO: "Search T.C. No",
        LISTANDEDITUSER_SEARCHADRESS: "Search Adress",
        LISTANDEDITUSER_SEARCHPHONENUMBER: "Search Phone Number",
        LISTANDEDITUSER_SEARCHEMAIL: "Search E-Mail",
        LISTANDEDITUSER_SEARCHUSERNAME: "Search Username",
        LISTANDEDITUSER_SEARCHCOMPANY: "Search Company",
        LISTANDEDITUSER_SEARCHOCCUPATION: "Search Occupation",
        REPORTDESIGN_REPORTTEMPLATEPARAMFAIL: "Template parameters are not acceptable for report format.",
        REPORTDESIGN_REPORTALLFIELDSSELECTEDFAIL: "All fields are selected.",
        DASHBOARD_REVENUE: "Form/Month",
        FORM_VERSION_MENUTITLE: "Version",
        FORM_ERRORMESSAGE_FORMSPAGE: "You don't have assigned forms.",
        FORM_MESSAGEFORSAVEDSUCCESSFULY: "The data has been saved successfully. ",
        FORM_MESSAGEFORDRAFTEDSUCCESSFULY: "The Draft data has been saved successfully.",
        FORM_ERRORMESSAGEFORSAVED: "Problems occured while trying to save data.It has been saved for offline use.",
        FORM_INVALIDMESSAGEFORSAVED: "Validation error(s) exist! Please check it out.",
        FORM_NOTSUPPORTED_MESSAGE: "This function is not supported.",
        STATUS1_LISTINGTASKPAGE: "InCompleted",
        STATUS0_LISTINGTASKPAGE: "Completed",
        STATUS2_LISTINGTASKPAGE: "Past Due",
        STATUS3_LISTINGTASKPAGE: "On Time",
        STATUS4_LISTINGTASKPAGE: "Critical",
        TASKBARCODE_LISTTASKPAGE: "Barcode",
        TASKEQUIPMENT_LISTTASKPAGE: "All Equipment",
        TASKREJECT_LISTTASKPAGE: "Reject Reason",
        TASKNAME_LISTTASKPAGE: "Task Name",
        TASKDESCRIPTION_LISTTASKPAGE: "Task Description",
        TASK_ASSIGNMENT_DATE: "Assignment Date",
        TASK_EXPIRE_DATE: "Expire Date",
        TASKSTATE_LISTTASKPAGE: "Task Status",
        PALETTE_ADDFUNCTION_DELETESUCCESSFULLY: "Function is successfully deleted.",
        PALETTE_ADDFUNCTION_DELETEERROR: "An error ocurred while trying to deleted function.",
        LOGIN_MODAL_FORGOTPASSWORD: "Forgot password?",
        VALIDATION_MODAL_EXPRESSION: "Regular Expression",
        VALIDATION_MODAL_STRING: "Test String",
        VALIDATION_MODAL_CHECK_BUTTON: "Check",
        VALIDATION_MODAL_TEST_TRUE_RESULT: "Match",
        VALIDATION_MODAL_TEST_FALSE_RESULT: "Not Match",
        VALIDATIONMODAL_TEST_REGEX: "Test Regex Value",
        FORGOTPASSWORD_SEND_BUTTON: "Send",
        CHANGEPASSWORD_NEXT_BUTTON: "Next",
        CHANGEPASSWORD_CANCEL_BUTTON: "Cancel",
        CHANGEPASSWORD_OLD: "Old password",
        CHANGEPASSWORD_NEW: "New password",
        CHANGEPASSWORD_VERIFY: "Verify the new password",
        CHANGEPASSWORD_ERROR_NOTMATCH: "Passwords do not match.",
        CHANGEPASSWORD_ERROR_INVALID_KEY: "Please check the given url.",
        CHANGEPASSWORD_ERRROR_FILLTHEFIELDS: "Please fill all the fields.",
        CHANGEPASSWORD_ERROR_WRONGPASSWORD: "Wrong password.Try again.",
        CHANGEPASSWORD_SUCCESSMESSAGE: "Your password was changed.",
        CHANGEPASSWORD_ERRORMESSAGE: "An error occured while trying to change.",
        CHANGEPASSWORD_HEADER: "Set your password",
        FORGOTPASSWORD_HEADER: "Reset your password",
        FORGOTPASSWORD_MODAL: "Send",
        FORGOTPASSWORD_SUCCESS: "Reset link is sent to  {{email}}.",
        FORGOTPASSWORD_ERROR: "Not valid username.",
        FORGOTPASSWORD_ERROR_EMPTYUSERNAME: "Please enter your username.",
        REPORT_DOCUMENTMODAL_STATUS: "Status",
        REPORT_DOCUMENTMODAL_STATUS_DOWNLOADABLE: "Downloadable",
        REPORT_DOCUMENTMODAL_STATUS_PREPARING: "Prepearing",
        ALLDOCUMENT_OTHER_DOCUMENT_TYPE: "Other",
        DATASOURCE_NAME: "Name",
        DATASOURCE_TYPE: "Type",
        DATASOURCE_ENDPOINT: "Endpoint",
        DATASOURCE_VALIDATE_BUTTON: "Validate",
        DATASOURCE_ADDLIST_BUTTON: "Add List",
        DATASOURCE_TYPE_SELECT_TEXT: "All Types",
        DATASOURCE_SEARCH_NAME: "Search name",
        DATASOURCE_ERROR_EMPTY_FIELD: "Please fill in all fields.",
        DATASOURCE_ERROR_UNVERIFIED: "Unverified response data.",
        DATASOURCE_SUCCESS_VERIFIED: "Verified.",
        DATASOURCE_ADD_ERRORMESSAGE: "An error occured while trying to add data source.",
        DATASOURCE_REMOVE_ERRORMESSAGE: "An error occured while trying to remove data source.",
        DATASOURCE_REMOVE_SUCCESSMESSAGE: "Data source is successfully removed.",
        DATASOURCE_ADD_SUCCESSMESSAGE: "Data source is successfully saved.",
        DATASOURCE_MODAL_MESSAGE: "The data you added will disappear. Are you sure you want to change it?",
        DATASOURCE_ERROR_ILLEAGALURI: "Illegal URI",
        DATASOURCE_ERROR_TIMEOUT_UNREACHABLE: "WebService is unreachable or maybe timeout has occured.",
        DATASOURCE_ERROR_SOME_ERROR_OCCURED: "Error occured!",
        DEVICE_ID: "Device UUID",
        DEVICE_CREATEDBY: "Created by",
        DEVICE_UUIDREQUIRED: "This field is required.",
        DEVICE_DEVICEALREADYADDED: "You have already add this device.",
        DEVICE_MAXNUMBERWARN: "You already reached max number of licenced devices.",
        DEVICE_DELETE_SUCCESSMESSAGE: "Device is uccessfully removed.",
        DEVICE_DELETE_ERRORMESSAGE: "An error occured while trying to remove device.",
        DEVICE_ADD_SUCCESSMESSAGE: "Device is successfully saved.",
        DEVICE_ADD_ERRORMESSAGE: "An error occured while trying to add data source.",
        TASK_COMPLETED: "Completed",
        TASK_INCOMPLETED: "Incompleted",
        TASK_LATE: "Past Due",
        TASK_ONTIME: "On Time",
        TASK_CRITICAL: "Critical",
        EMPTY_GALLERY_MESSAGE: "There isn't any uploaded picture.",
        OPTION_ERROR_VALUE: "Please enter a value other than 'false'",
        DASHBOARD_COMPLETE_TASK: "Completed Task",
        DASHBOARD_INCOMPLETE_TASK: "Incompleted Task",
        DASHBOARD_COMPLETE_FORM: "Completed Form",
        DASHBOARD_BARCHAR_HEADER_FREE_FORM: "FORMS",
        DASHBOARD_BARCHAR_HEADER_TASK_FORM: "TASKS",
        DASHBOARD_BARCHAR_DESCRIPTION_FOR_TASK_FORM: "The number of completion of form by officers are shown below.",
        DASHBOARD_BARCHAR_DESCRIPTION_FOR_FREE_FORM: "The number of completed forms of the person who is not assigned any task is shown below",
        DASHBOARD_CRITICAL_PERCENTAGE: "Critical Percentage",
        DASHBOARD_FILTER_LAST_1_WEEK: "LAST 1 WEEK",
        DASHBOARD_FILTER_LAST_1_MONTH: "LAST 1 MONTH",
        DASHBOARD_FILTER_LAST_3_MONTH: "LAST 3 MONTH",
        CHARACTER_LIMITATION_ERRORMESSAGE: "Please not enter more than 10.000 character.",
        CHARACTER_LIMITATION_ERRORMESSAGE_APPLICATION_NAME_DESCRIPTION: "Please not enter more than 10.000 character on application name or description.",
        SENDASSIGNMENT_BACK_USERNAME: "Assigned Username",
        SENDASSIGNMENT_BACK_EXPIRE_DATE: "Task Expire Date",
        SENDASSIGNMENT_BACK_REJECTION_HEADER: "Rejection Information",
        SENDASSIGNMENT_BACK_REJECTION_REASON: "Rejection Reason",
        SENDASSIGNMENT_BACK_REJECT_BUTTON: "Reject",
        REPORT_PARAMETERS_ACTIVE: "Active",
        REPORT_PARAMETERS_ARCHIVE: "Archive",
        REPORT_STATUS_REJECTED: "Rejected.",
        REPORT_STATUS_APPROVED: "Approved.",
        REPORT_RESULT_CONFIRM_MESSAGE_APPROVE: "Are you sure to approve the report?",
        REPORT_RESULT_SUCCESS_APPROVE_MESSAGE: "Report is successfully approved.",
        REPORT_RESULT_ERROR_APPROVE_MESSAGE: "An error occured while trying to approve report.",
        REPORT_RESULT_SUCCESS_REJECT_MESSAGE: "Report is successfully rejected.",
        REPORT_RESULT_ERROR_REJECT_MESSAGE: "An error occured while trying to reject report.",
        TASK_EQUIPMENT_ERROR_MESSAGE: "There is no equipment assigned to this task.",
        TASK_EQUIPMENT_MODAL_NAMES: "Equipment Names",
        ROW_LIMITATION_ERROR: "Since the number of lines exceeds 50, the line can not be added.",
        REPORT_DESIGN_SELECT_PARAMETER: "Select Parameter",
        REPORT_LEAVE_BLANK_ERROR: "Please do not leave the parameter and report data fields blank.",
        REPORT_GO_BACK_ERROR: "Your data will be lost. Are you sure you want to go back?",
        OPENAPP_ERROR: "An error occured while trying to open form.",
        COPIED_INFO: "Copied!",
        REPORT_EXPORT_ERROR: "An error occured while trying to export data.",
        UPLOAD_ERROR_MESSAGE: "An error occured while trying to upload file.",
        DETAIL_CAMERAMODAL_DESCRIPTION: "IMAGE DESCRIPTION",
        DETAIL_CAMERAMODAL_UPLOAD_BUTTON: "UPLOAD IMAGE",
        PALETTE_ADDNOTIFICATION: "Add Notification",
        SEARCH_FORM_PLACEHOLDER: "Search Form"
    },
    translationsTR = {
        CHANGE_BUTTON: "Değiştir",
        CREATE_BUTTON: "Oluştur",
        BACK_BUTTON: "Geri",
        CLEAR_BUTTON: "Temizle",
        ADD_BUTTON: "Ekle",
        ARCHIVE_BUTTON: "Arşiv",
        REFRESH_BUTTON: "Yenile",
        UPDATE_BUTTON: "Güncelle",
        SAVE_BUTTON: "Kaydet",
        TABLE_CANCELBUTTON: "İptal",
        TABLE_DELETEBUTTON: "Sil",
        TABLE_EDITBUTTON: "Düzenle",
        TABLE_OKEYBUTTON: "Tamam",
        TABLE_SEARCHBUTTON: "Ara",
        TABLE_ROWSONPAGE: "Sayfadaki satır sayısı",
        TABLE_REMOVEFILTERBUTTON: "Filtreleri Kaldır",
        CONFIRM_YESBUTTON: "Evet",
        CONFIRM_NOBUTTON: "Hayır",
        REQUIREDFIELD_ERROR: "Bu alanın doldurulması zorunludur.",
        VALIDFIELD_ERROR: "Lütfen geçerli bir T.C. numarası giriniz.",
        VALIDEMAIL_ERROR: "Lütfen geçerli bir e-posta adresi giriniz.",
        VALIDPHONEFIELD_ERROR: "Lütfen geçerli bir telefon numarası giriniz.",
        EMAILEXIST_ERROR: "Girilen e-posta adresi kullanılmaktadır.",
        USEREXISTS_ERROR: "Bu kullanıcı mevcuttur.",
        USERNAMEEXISTS_ERROR: "Girilen kullanıcı adı mevcuttur.",
        USERTCNOEXIST_ERROR: "Girilen T.C. numarası kullanılmaktadır.",
        USERPAGE_USERINFOHEADER: "Kullanıcı Bilgileri",
        USERPAGE_USERUSERNAMEHEADER: "Kullanıcı Adı",
        USERPAGE_USERNAMEHEADER: "Adı",
        USERPAGE_USERSURNAMEHEADER: "Soyadı",
        USERPAGE_USERTCNOHEADER: "T.C. Numarası",
        USERPAGE_USERCOMPANYNAMEHEADER: "Firma Adı",
        USERPAGE_USEROCCUPATIONHEADER: "Meslek",
        USERPAGE_CONTACTINFOHEADER: "İletişim Bilgileri",
        USERPAGE_CONTACTEMAILHEADER: "E-posta",
        USERPAGE_CONTACTPHONEHEADER: "Telefon Numarası",
        USERPAGE_CONTACTADDRESSHEADER: "Adres",
        USERPAGE_USERROLEHEADER: "Rol",
        USERPAGE_ADDUSERBUTTON: "Kaydet",
        USERPAGE_ADDSUCCESSMESSAGE: "Kullanıcı başarıyla eklendi.",
        USERPAGE_ADDERRORMESSAGE: "Kullanıcı ekleme sırasında bir hata oluştu.",
        USERPAGE_UPDATESUCCESSMESSAGE: "Kullanıcı bilgileri başarıyla güncellendi.",
        USERPAGE_UPDATEERRORMESSAGE: "Kullanıcı bilgileri güncellenirken bir hata oluştu.",
        USERPAGE_DELETESUCCESSMESSAGE: "Kullanıcı başarıyla silindi.",
        USERPAGE_DELETEERRORMESSAGE: "Kullanıcı silme işlemi sırasında bir hata oluştu.",
        USERPAGE_AUTHORISATIONSUCCESSMESSAGE: "Kullanıcı başarıyla yetkilendirildi.",
        USERPAGE_AUTHORISATIONERRORMESSAGE: "Kullanıcı yetkilendirme işlemi sırasında bir hata oluştu.",
        ASSIGNUSERTOAPPLICATION_FORMS: "Tüm Formlar",
        ASSIGNUSERTOAPPLICATION_USERS: "Tüm Kullanıcılar",
        ASSIGNUSERTOAPPLICATION_TOGGLEALL: "Tümünü seç",
        ASSIGNUSERTOAPPLICATION_ADDBUTTON: "Ekle",
        ASSIGNUSERTOAPPLICATION_REMOVEBUTTON: "Sil",
        ASSIGNUSERTOAPPLICATION_ASSIGNEDUSERS: "Seçilen Forma Atanmış Kullanıcılar",
        ASSIGNUSERTOAPPLICATION_SAVEBUTTON: "Kaydet",
        ASSIGNUSERTOAPPLICATION_NOSELECTION: "Seçim yapınız",
        ASSIGNUSERTOAPPLICATION_ADDSUCCESSMESSAGE: "Kullanıcılar forma başarıyla atanmıştır.",
        ASSIGNUSERTOAPPLICATION_ADDERRORMESSAGE: "Atama işlemi sırasında bir hata oluştu.",
        ASSIGNTASKPAGE_ASSIGNBUTTON: "Görev Atama",
        ASSIGNTASKPAGE_TABLENAME: "Form",
        ASSIGNTASKPAGE_TABLEUSERS: "Kullanıcı",
        ASSIGNTASKPAGE_TABLETASK: "Adı",
        ASSIGNTASKPAGE_TABLEVERSION: "Versiyon",
        ASSIGNTASKPAGE_TABLEDESCRIPTION: "Tanımı",
        ASSIGNTASKPAGE_TABLEBARCODE: "Ürün Numarası",
        ASSIGNTASKPAGE_TABLEEQUIPMENT: "Ekipman Türü",
        ASSIGNTASKPAGE_TABLESTARTDATE: "Atama Tarihi",
        ASSIGNTASKPAGE_TABLEEXPIREDATE: "Bitiş Tarihi",
        ASSIGNTASKPAGE_TABLETASK_STATUS: "Durumu",
        ASSIGNTASKPAGE_MODALMESSAGE: "Aktif olan görevi silmek istediğinizden emin misiniz?",
        ASSIGNTASKPAGE_MODALDELETESUCCESSMESSAGE: "Görev başarıyla silindi.",
        ASSIGNAPPLICATIONPAGE_MODALMESSAGE: "Aktif olan görevi silmek istediğinizden emin misiniz?",
        ASSIGNTASKPAGE_ADDSUCCESSMESSAGE: "Görev ataması başarıyla gerçekeştirildi.",
        ASSIGNTASKPAGE_ADDERRORMESSAGE: "Görev oluşturma sırasında bir hata oluştu.",
        ASSIGNTASKPAGE_UPDATESUCCESSMESSAGE: "Görev ataması başarıyla güncellendi.",
        ASSIGNTASKPAGE_UPDATEERRORMESSAGE: "Görev güncelleme sırasında bir hata oluştu.",
        ASSIGNTASKPAGE_DELETESUCCESSMESSAGE: "Görev ataması başarıyla silindi.",
        ASSIGNTASKPAGE_DELETEERRORMESSAGE: "Görev silme işlemi sırasında bir hata oluştu.",
        ASSIGNTASKPAGE_ERROR_MESSAGE_DATA_COMPARE: "Görevin bitiş tarihi atanma tarihinden büyük olacak şekilde giriniz.",
        ASSIGNTASKPAGE_DEFAULT_SELECT_TEXT: "- Ekipman Grubu Seçiniz -",
        ASSIGNTASKPAGE_TAB_1: "Form Bilgileri",
        ASSIGNTASKPAGE_TAB_2: "Görev Bilgileri",
        ASSIGNTASKPAGE_TAB_3: "Ekipman Bilgileri",
        ASSIGNTASKPAGE_MULTISELECT_DEFAULT: "Seçim yapınız",
        ASSIGNTASKPAGE_MULTISELECT_COUNT: "Seçilen form sayısı: ",
        ADDEQUIPMENTPAGE_TABLENAME: "Adı",
        ADDEQUIPMENTPAGE_TABLEDESCRIPTION: "Tanımı",
        ADDEQUIPMENTPAGE_TABLESERIALNUMBER: "Seri Numarası",
        ADDEQUIPMENTPAGE_TABLEEQUIPMENTTYPE: "Ekipman Grubu",
        ADDEQUIPMENTPAGE_SEARCHNAME: "Adı Ara",
        ADDEQUIPMENTPAGE_SEARCHDESCRIPTION: "Tanım Ara",
        ADDEQUIPMENTPAGE_SEARCHSERIALNUMBER: "Seri Numarası Ara",
        ADDEQUIPMENTPAGE_SEARCHEQUIPMENTTYPE: "Ekipman Grubu Ara",
        ADDEQUIPMENTPAGE_ADDSUCCESSMESSAGE: "Ekipman başarıyla eklendi.",
        ADDEQUIPMENTPAGE_ADDERRORMESSAGE: "Ekipman ekleme sırasındaa bir hata oluştu.",
        ADDEQUIPMENTPAGE_UPDATESUCCESSMESSAGE: "Ekipman başarıyla güncellendi.",
        ADDEQUIPMENTPAGE_UPDATEERRORMESSAGE: "Ekipman bilgileri güncelleme sırasında bir hata oluştu.",
        ADDEQUIPMENTTYPEPAGE_WARNINGMESSAGE: "Bu ekipman grubu göreve / görevlere atandığından silinemez.",
        ADDEQUIPMENTPAGE_DELETESUCCESSMESSAGE: "Ekipman başarıyla silindi.",
        ADDEQUIPMENTPAGE_DELETEERRORMESSAGE: "Ekipman silme sırasında bir hata oluştu.",
        ADDEQUIPMENTTYPEPAGE_ADDSUCCESSMESSAGE: "Ekipman grubu başarıyla eklendi.",
        ADDEQUIPMENTTYPEPAGE_ADDERRORMESSAGE: "Ekipman grubu ekleme işlemi sırasında bir hata oluştu.",
        ADDEQUIPMENTTYPEPAGE_DELETESUCCESSMESSAGE: "Ekipman grubu başarıyla silindi.",
        ADDEQUIPMENTTYPEPAGE_DELETEERRORMESSAGE: "Ekipman grubu silme işlemi sırasında bir hata oluştu.",
        ADDEQUIPMENTTYPEPAGE_EXISTERROR: " isimli ekipman grubu mevcuttur.",
        LISTLOG_SEARCHMESSAGE: "Mesaj Ara",
        LISTLOG_FILTER: "Filtreler",
        LISTLOG_FILTERAPPLICATION: "Formlar",
        LISTLOG_FILTERENVIRONMENT: "Platformlar",
        LISTLOG_FILTERLEVEL: "Log Seviyeleri",
        LISTLOG_SEARCHSTARTDATE: "Başlangıç Tarihi",
        LISTLOG_SEARCHENDDATE: "Bitiş Tarihi",
        LISTLOG_TABLETIMESTAMP: "İşlem Zamanı",
        LISTLOG_TABLEAPPLICATIONVERSION: "Form Versiyonu",
        LISTLOG_TABLEAPPLICATION: "Form",
        LISTLOG_TABLEENVIRONMENT: "Platform",
        LISTLOG_TABLELEVEL: "Log Seviyesi",
        LISTLOG_TABLEMESSAGE: "Mesaj",
        LISTLOG_DEVICEID: "Cihaz ID",
        PROFILE_USERHEADER: "Kullanıcı Bilgileri",
        PROFILE_NAME: "Adı",
        PROFILE_SURNAME: "Soyadı",
        PROFILE_USERNAME: "Kullanıcı Adı",
        PROFILE_TC: "T.C. Numarası",
        PROFILE_COMPANY: "Firma Adı",
        PROFILE_OCCUPATION: "Meslek",
        PROFILE_CONTACTHEADER: "İletişim Bilgileri",
        PROFILE_EMAIL: "E-posta",
        PROFILE_ADDRESS: "Adres",
        PROFILE_PHONE: "Telefon Numarası",
        REPORT_DOCUMENTMODAL_TABLENAME: "Belge Adı",
        APPLICATIONPAGE_FORMLISTNAME: "Formlar",
        APPLICATIONPAGE_ADDNEWFORMBUTTON: "Yeni Form Oluştur",
        APPLICATIONPAGE_OPENSELECTEDADPP: "Aç",
        APPLICATIONPAGE_APPCURRENTVERSION: "Versiyon",
        APPLICATIONPAGE_APPCREATEDBY: "Oluşturan Kullanıcı",
        APPLICATIONPAGE_FORMTYPE: "Form Tipi",
        APPLICATIONPAGE_FREEFORM: "Görev Bağımsız Form",
        APPLICATIONPAGE_ASSIGNMENTREQUIRED: "Görev Bağımlı Form",
        APPLICATIONPAGE_APPCREATEDAT: "Oluşturulma Tarihi",
        APPLICATIONPAGE_APPDESCRIPTION: "Açıklama",
        APPLICATIONPAGE_APPUPDATEDAT: "Düzenleme Tarihi",
        APPLICATIONPAGE_APPNAME: "Adı",
        APPLICATIONPAGE_APPDELETE: "Sil",
        APPLICATIONPAGE_APPUPDATE: "Değiştir",
        APPLICATIONPAGE_APPSAVE: "Kaydet",
        APPLICATIONPAGE_APPCLEAR: "İptal",
        APPLICATIONPAGE_APPSEARCH: "Ara",
        APPLICATIONPAGE_APPGETERROR: "Tüm formları görüntüleme sırasında bir hata oluştu.",
        PALETTE_BEFORERELOAD_ERRORMESSAGE: "Yapılan değişiklikler kaydedilmeyecektir.",
        PALETTE_SAVE: "Kaydet",
        PALETTE_GALLERY: "Galeri",
        PALETTE_PALETTE: "Palet",
        PALETTE_PROPERTIES: "Özellikler",
        PALETTE_DELETE: "Sil",
        PALETTE_ADDVALIDATION: "Validasyon Ekle",
        PALETTE_ADDEVENT: "Event Ekle",
        PALETTE_INFOCONTENT: "İçerik",
        PALETTE_TABFUNCTION: "Fonksiyon Ekle",
        SAVE_ON_PROGRESS: "Lütfen işlem sonuçlanana kadar bekleyiniz...",
        PALETTE_MUSTPICKHOMEPAGE: "Lütfen ana sayfa seçimi yapınız.",
        PALETTE_MUSTPICKUNIQUEID: "Lütfen en az bir unique alan seçiniz.",
        PALETTE_MUSTADDNAVIGATIONFUNCTION: "Navigasyona fonksiyon eklemeden ilerlenemez. ",
        PALETTE_APPLICATIONSAVEDERROR: "Form kaydedilemedi.",
        PALETTE_SAVESUCCESSMESSAGE: "Uygulama başarıyla kaydedildi.",
        PALETTE_SAVEERRORMESSAGE: "Uygulama kaydedilme işlemi sırasında bir hata oluştu.",
        PALETTE_ERRORMESSAGE_INSERTGRID: "Lütfen bu alana 'Grid' sürükleyiniz.",
        PALETTE_ERRORMESSAGE_INSERTFORM: "Lütfen bu alana 'Section' sürükleyiniz.",
        PALETTE_ERRORMESSAGE_INSERTCOLUMN: "Lütfen bu alana form elemanı (Input,Text vs.) sürükleyiniz.",
        PALETTE_ERRORMESSAGE_INSERTNAVIGATIONORFORM: "Lütfen bu alana 'Section' ya da 'Navigation Tab' sürükleyiniz.",
        PALETTE_MULTISELECT_TEXT: "Seçiniz",
        VALIDATIONMODAL_SELECTED: "Mevcut Validasyonlar",
        PALETTE_ADDNAVIGATIONTABTOFUNCTION_SUCCESSMESSAGE: "Fonksiyon başarıyla kaydedilmiştir.",
        VALIDATIONMODAL_NAME: "Adı",
        VALIDATIONMODAL_VALUE: "Değeri",
        VALIDATIONMODAL_ERRORMESSAGE: "Hata Mesajı",
        NEWAPPMODAL_APPNAME: "Form Adı",
        NEWAPPMODAL_APPDESCRIPTION: "Açıklama",
        NEWAPPMODAL_APPSUCCESS: "Form başarıyla oluşturuldu.",
        NEWAPPMODAL_APPFAIL: "Form oluşturma işlemi sırasında bir hata oluştu.",
        NEWAPPMODAL_SELECTFORM: "Mevcut form üzerinden işlem yapmak için tıklayınız.",
        NEWAPPMODAL_FORMLIST: "Formlar",
        NEWAPPMODAL_CREATEBUTTON: "Oluştur",
        NEWPAGEMODAL_PAGETITLE: "Sayfa İsmi",
        NEWAPPMODAL_FORMTYPE: "Form Türü",
        NEWPAGEMODAL_OKBUTTON: "Tamam",
        ADDEVENT_TABEVENT: "Event Ekle",
        ADDEVENT_TABFUNCTION: "Fonksiyon Ekle",
        ADDEVENT_EVENTLIST: "Event Listesi",
        ADDEVENT_SEARCHINPUT: "Event Ara",
        ADDFUNCTION_LIST: "Fonksiyon Listesi",
        ADDFUNCTION_SEARCHFUNCTION: "Fonksiyon Ara",
        ADDFUNCTION_NAME: "Fonksiyon Adı",
        ADDFUNCTION_FUNCTIONDETAIL: "Fonksiyon Detayı",
        ADDFUNCTION_NAVIGATEDPAGE: "Sayfalar",
        ADDFUNCTION_SEARCHPAGE: "Sayfa Ara",
        ADDFUNCTION_SUCCESSMESSAGE: "Fonksiyon başarılı bir şekilde kaydedildi.",
        ADDFUNCTION_ERRORMESSAGE: "Fonksiyon kaydetme işlemi sırasında bir hata oluştu.",
        UPDATEFUNCTION_SUCCESSMESSAGE: "Fonksiyon başarılı bir şekilde güncellendi.",
        UPDATEFUNCTION_ERRORMESSAGE: "Fonksiyon güncelleme işlemi sırasında bir hata oluştu.",
        ADDEVENTMODAL_TYPE: "Event Adı",
        ADDEVENTMODAL_FUNCTIONTYPE: "Fonksiyon Tipi",
        ADDEVENTMODAL_SEARCHFUNCTION: "Fonksiyon Tipi Ara",
        ADDEVENTMODAL_FUNCTIONS: "Fonksiyonlar",
        ADDEVENT_ADDBUTTON: "Ekle",
        ADDEVENT_SAVEBUTTON: "Kaydet",
        ADDEVENT_DELETENAVIGATIONTABBUTTON: "Sil",
        ADDEVENT_CLEARBUTTON: "Temizle",
        ADDVALIDATION_ADDBUTTON: "Ekle",
        ADDVALIDATION_SAVEBUTTON: "Kaydet",
        ADDVALIDATION_CLEARBUTTON: "Temizle",
        CONFIRMDELETE_USER_MESSAGE: "Seçili kullanıcıyı kalıcı olarak silmek istediğinize emin misiniz?",
        CONFIRMDELETE_MESSAGE: "Silmek istediğinize emin misiniz? ",
        CONFIRMDELETE_YES: "Evet",
        CONFIRMDELETE_NO: "Hayır",
        CONFIRMBEFORECLOSINGTHEADITOR_MESSAGE: "Editörü kapatmadan önce değişiklikleri kaydetmek istiyor musunuz?",
        CONFIRMBEFORECLOSINGTHEADITOR_CLOSE: "Editörü kapat",
        CONFIRMBEFORECLOSINGTHEADITOR_CLOSEANDSAVE: "Kaydet ve kapat",
        CONFIRMBEFORECLOSINGTHEADITOR_CLOSEWITHOUTSAVE: "Kaydetmeden kapat",
        CONFIRMBEFORECLOSINGTHEADITOR_APPSUCCESSDELETE: "Form başarılıyla silindi.",
        CONFIRMBEFORECLOSINGTHEADITOR_APPFAILDELETE: "Form silme işlemi sırasında bir hata oluştu.",
        ADDFUNCTIONDETAILMODAL_NAME: "Adı",
        ADDFUNCTIONDETAILMODAL_DETAIL: "Fonksiyon Tanımı",
        DASHBOARD_PAGETOP_LOGOUT: "Çıkış Yap",
        DASHBOARD_PAGETOP_PROFILE: "Profil",
        DASHBOARD_CONTENTTOP_HOME: "Anasayfa",
        USERAUTHORISATION_TABLENAME: "İsim",
        USERAUTHORISATION_TABLESURNAME: "Soyadı",
        USERAUTHORISATION_TABLEUSERNAME: "Kullanıcı Adı",
        USERAUTHORISATION_TABLEROLE: "Rol",
        USERAUTHORISATION_SEARCHNAME: "İsim Ara",
        USERAUTHORISATION_SEARCHSURNAME: "Soyadı Ara",
        USERAUTHORISATION_SEARCHUSERNAME: "Kullanıcı Adı Ara",
        USERAUTHORISATION_SEARCHROLE: "Rol Ara",
        REPORTDESIGN_CHOOSEAPP: "Belge tasarımı oluşturmak için bir form seçiniz.",
        REPORTDESIGN_CONTINUE: "Devam Et",
        REPORTDESIGN_TEMPLATEURL: "Şablon Linki",
        REPORTDESIGN_ADDFILE: "Dosya Ekle",
        REPORTDESIGN_UPLOADFILE: "Dosya Yükle",
        REPORTDESIGN_UPLOADFILEBUTTON: "Yükle",
        REPORTDESIGN_UPLOADFILEWARNING: "Dosya yüklenirken bir hata oluştu.",
        REPORTDESIGN_UPLOADFILESUCCESS: "Dosya başarıyla yüklendi.",
        REPORTDESIGN_TIPS: "İpuçları",
        REPORTDESIGN_TAB1: "FORM",
        REPORTDESIGN_TAB2: "ŞABLON",
        REPORTDESIGN_TAB3: "TASARIM",
        REPORTDESIGN_SAVE: "Kaydet",
        REPORTDESIGN_BACK: "Geri",
        REPORTDESIGN_REPORTDATA: "Şablon Verileri",
        REPORTDESIGN_FORMDATA: "Form Verileri",
        REPORTDESIGN_SELECTEDTEMPLATE: "Seçilen Şablon",
        REPORTDESIGN_ADDNEWROW: "Yeni alan ekle",
        REPORTDESIGN_EDITROWBUTTON: "Düzenle",
        REPORTDESIGN_TEMPLATE_ADDBUTTON: "Ekle",
        REPORTDESIGN_TEMPLATE_DELETEBUTTON: "Sil",
        REPORTDESIGN_DELETEROWBUTTON: "Sil",
        REPORTDESIGN_SAVEROWBUTTON: "Kaydet",
        REPORTDESIGN_CANCELROWBUTTON: "İptal",
        REPORTDESIGN_UPDATEROWBUTTON: "Güncelle",
        REPORTDESIGN_REPORTSAVESUCCESS: "Belge başarıyla kaydedildi.",
        REPORTDESIGN_REPORTSAVEFAIL: "Belge kaydedilme işlemi sırasında bir hata oluştu.",
        REPORTDESIGN_REPORTSAVECONFIRMMESSAGE: "Kaydetmek istediğinize emin misiniz?",
        REPORTDESIGN_ADDSAMEFILEERROR: "Aynı doküman yeniden yüklenemez.",
        REPORTDESIGN_FILEFORMATERROR: "Lütfen .docx, .doc veya .odt uzantılı şablon yükleyin.",
        REPORTDESIGN_TAB2HEADER: "Lütfen listeye bir ya da daha fazla şablon dokümanı ekleyin.",
        REPORTDESIGN_SELECTEDCOLUMN: "Seçilen Doküman",
        REPORTDESIGN_DEFAULTVALUE: "Seçiniz",
        REPORTDESIGN_UNCOMITTEDROW_ERROR: "Şablon verilerinde kaydedilmemiş satırlar mevcut. Geri dönmeden önce lütfen değişiklikleri kaydedin.",
        REPORTDESIGN_UPDATEDOCCONFIRMMESSAGE: "Daha önce eşleştirilmiş parametre verileriniz değişebilir. Bu dokümanı güncellemeye devam etmek istiyor musunuz?",
        REPORTRESULT_TRANSACTIONDATE: "İşlem Tarihi",
        REPORTRESULT_ASSIGNMENTDATE: "Atanma Tarihi",
        REPORTRESULT_USERNAME: "Kullanıcı Adı",
        REPORTRESULT_TASK: "Görev",
        REPORTRESULT_UNIQUEID: "Unique ID",
        REPORTRESULT_REPORT: "Rapor",
        REPORTRESULT_SEARCH: "Ara",
        REPORTRESULT_DETAIL: "Detay",
        REPORTRESULT_STATUS: "Durum",
        REPORTRESULT_LOCATION: "Lokasyon",
        REPORTRESULT_FORM: "Form",
        REPORTRESULT_ERRORMESSAGE: "Tüm raporların alım işlemi sırasında bir hata oluştu.",
        LINK_SHOWLOCATION: "Lokasyonu Göster",
        MULTISELECT_BUTTONNAME: "Seçiniz",
        DASHBOARD_PAGETOP_LOGOUT: "Çıkış Yap",
        DASHBOARD_PAGETOP_PROFILE: "Profil",
        DASHBOARD_CONTENTTOP_HOME: "Anasayfa",
        DASHBOARD_PIECHART_ACTIVEUSER: "Aktif Kullanıcılar",
        DASHBOARD_PIECHART_ACTIVEDEVICE: "Aktif Cihazlar",
        DASHBOARD_PIECHART_COMPLETEDTASK: "Tamamlanmış Görevler",
        DASHBOARD_PIECHART_CRITICALTASK: "Aktif Formlar",
        DASHBOARD_CHARTNAME: "Formlar",
        SIDEMENU_MORE: "Daha Fazlası",
        SIDEMENU_FORM_MANAGEMENT: "Form Yönetimi",
        SIDEMENU_PROFILE: "Profil",
        SIDEMENU_DEVICE: "Cihazlarım",
        SIDEMENU_DATASOURCE: "Datasource",
        SIDEMENU_FORMS: "Formlarım",
        SIDEMENU_TASK: "Görevlerim",
        SIDEMENU_HOME: "Anasayfa",
        SIDEMENU_PALETTE: "Palet",
        SIDEMENU_DEVICELOG: "Cihaz Log Listesi",
        SIDEMENU_USEROPERATIONS: "Kullanıcı İşlemleri",
        SIDEMENU_USEROPERATIONSADD: "Kullanıcı Ekleme",
        SIDEMENU_USEROPERATIONSLISTANDEDIT: "Kullanıcı Listeleme ve Düzenleme",
        SIDEMENU_USEROPERATIONSAUTHORISATION: "Kullanıcı Yetkilendirme",
        SIDEMENU_CONTROLEQUIPMENT: "Kontrol Ekipmanları",
        SIDEMENU_CONTROLEQUIPMENT_ADDEQUIPMENTGROUP: "Ekipman Grubu Ekleme",
        SIDEMENU_CONTROLEQUIPMENT_EDITANDADDEQUIPMENT: "Ekipman Ekleme ve Düzenleme",
        SIDEMENU_CONTROLMANAGEMENT: "Görev Yönetimi",
        SIDEMENU_CONTROLMANAGEMENT_ASSIGNAPPLICATION: "Form Atama",
        SIDEMENU_CONTROLMANAGEMENT_ASSIGNTASK: "Görev Atama",
        MENU_CHANGEPASSWORD: "Parolanı Değişir",
        SIDEMENU_REPORT: "Rapor",
        SIDEMENU_REPORT_RESULT: "Rapor Sonuçları",
        SIDEMENU_REPORT_DESIGNREPORT: "Belge Tasarımı",
        SIDEMENU_REPORT_FORMDATA_EXPORT: "Verileri Dışa Aktar",
        LOGINPAGE_USERNAME: "Kullanıcı Adı",
        LOGINPAGE_PASSWORD: "Şifre",
        LOGINPAGE_SIGNUP: "Giriş Yap",
        LOGINPAGE_LANGUAGESELECT_TR: "Türkçe",
        LOGINPAGE_LANGUAGESELECT_EN: "İngilizce",
        LOGINPAGE_ERROR_EMPTYFIELD: "Tüm alanların doldurulması zorunludur.",
        LOGINPAGE_ERROR_WRONGUSERORPASSWORD: "Kullanıcı adı veya şifre hatalı.",
        STATIC_FUNCTIONS: "Statik Fonksiyonlar",
        USER_DEFINED_FUNCTIONS: "Kullanıcı Tanımlı Fonksiyonlar",
        NAVIGATION_FUNCTIONS: "Navigasyon Fonksiyonları",
        LISTANDEDITUSER_SEARCHNAME: "Adı Ara",
        LISTANDEDITUSER_SEARCHSURNAME: "Soyadı Ara",
        LISTANDEDITUSER_SEARCHTCNO: "T.C. Numarası Ara",
        LISTANDEDITUSER_SEARCHADRESS: "Adres Ara",
        LISTANDEDITUSER_SEARCHPHONENUMBER: "Telefon Numarası Ara",
        LISTANDEDITUSER_SEARCHEMAIL: "E-posta Ara",
        LISTANDEDITUSER_SEARCHUSERNAME: "Kullanıcı Adı Ara",
        LISTANDEDITUSER_SEARCHCOMPANY: "Firma Ara",
        LISTANDEDITUSER_SEARCHOCCUPATION: "Meslek Ara",
        REPORTDESIGN_REPORTTEMPLATEPARAMFAIL: "Şablon paremetreleri rapor formatına uygun değildir.",
        REPORTDESIGN_REPORTALLFIELDSSELECTEDFAIL: "Tüm alanlar seçilmiştir.",
        TOOLTIP_PALETTE_ADDNEWFORM_FORMTYPE: "Görev bağımlı formun anlamı,doldurulacak formun önceden görev ataması yapılmış olması gerekmektedir.Görev bağımsız formun anlamı, formun doldurulmadan önce herhangi bir bağımlılığı olmadığı anlamına gelir",
        TOOLTIP_PALETTE_ADDNEWFORM_SELECTEXISTINGFORM: "Linke basıldığında yeni oluşturulacak formu önceden oluşmuş formdan kopyalayabilirsiniz",
        TOOLTIP_PALETTE_SELECTBOX: "Birden fazla seçenek ekleyebileceğiniz ve bunlardan birini seçebileceğiniz açılabilir kutu",
        TOOLTIP_PALETTE_CHECKBOX: "Birçok seçenek arasından bir veya daha fazla seçim yapılmasını sağlayan araçtır",
        TOOLTIP_PALETTE_RADIOBUTTON: "Birçok seçenek arasından bir tane seçim yapılmasını sağlayan araçtır",
        TOOLTIP_PALETTE_CAMERA: "Cihazda kamera özelliği olması halinde kamerayı açar ve fotoğraf çekilebilmesini sağlar",
        TOOLTIP_PALETTE_CAMERANDNOTE: "Cihazda kamera özelliği olması halinde kamerayı açar ve çekilen fotoğrafa açıklama getirilmesini sağlar",
        TOOLTIP_PALETTE_NAVIGATION: "Form üzerindeki farklı sayfalar üzerinde ileri/geri geçiş yapılmasını sağlayan araçtır",
        TOOLTIP_PALETTE_INFO: "Tıklandığında resim veya detay girilebilen bilgi mesajı penceresi açmanızı sağlar",
        TOOLTIP_PALETTE_BARCODEREADER: "Bu araç cihazın kamerasını açarak barkodların okunmasını ve verinin form üzerine aktarılmasını sağlar",
        TOOLTIP_PALETTE_INPUT: "Form üzerinde metin girişi yapılabilecek tek satır bir alan ekler",
        TOOLTIP_PALETTE_BUTTON: "Form üzerinde fonksiyonlar tanımlayarak çalıştırmak için bu komponenti kullanabilirsiniz. Örneğin sayfaya buton ekleyerek navigasyon fonskyionuyla sayfalar arası geçiş sağlayabilirsiniz",
        TOOLTIP_PALETTE_TEXTAREA: "Form üzerinde metin girişi yapılabilecek birden fazla satırlı bir alan ekler",
        TOOLTIP_PALETTE_STATICTEXT: "Bu komponent ile form üzerine değiştirilemez görünümlü başlık veya açıklama ekleyebilirsiniz",
        TOOLTIP_PALETTE_MULTISELECT: "Birden fazla seçenek ekleyebileceğiniz ve bunlardan bir veya birden çoğunu seçebileceğiniz açılabilir kutu",
        TOOLTIP_PALETTE_GRID: "Palet üzerindeki bileşenleri forma eklemeden önce sayfaya 'Grid' eklenmesi gerekir. Grid üzerine alt menüdeki bileşenleri yerleştirebilirsiniz",
        TOOLTIP_REPORT_DESIGNREPORT_TEMPLATEURL: "Yükleme sonrası oluşan indirilebilir şablon dokümanını ifade eder",
        TOOLTIP_REPORT_DESIGNREPORT_ADDFILE: "Sunucuya yüklemek üzere bilgisayarınızdan bir doküman seçin",
        TOOLTIP_REPORT_DESIGNREPORT_UPLOADFILE: "Seçilen dokümanı sunucuya yükleyin",
        TOOLTIP_REPORT_DESIGNREPORT_REPORTDATA: "Bir önceki sayfada seçilen şablon dokümanının sürükleme sonrası yerleştirilebilen alanlarını içerir",
        TOOLTIP_REPORT_DESIGNREPORT_FORMDATA: "Seçilen uygulamanın sürüklenebilir bileşenlerini içerir",
        TOOLTIP_DEVICELOG_TIMESTAMP: "Log mesajında ifade edilen işlemin gerçekleşme zamanını ifade eder",
        TOOLTIP_DEVICELOG_APPVERSION: "Cihazda üzerinde çalışılan formun o anki versiyonu",
        TOOLTIP_DEVICELOG_APPLICATION: "Cihazda üzerinde çalışılan form",
        TOOLTIP_DEVICELOG_ENVIRONMENT: "Cihazın üzerinde çalıştığı işletim sistemi",
        TOOLTIP_DEVICELOG_LEVEL: "Log mesajları farklı önem derecesiyle bildirilir. 'Fatal' ve 'Error' bir problem olduğuna işaret ederken, diğerleri işlemle ilgili bilgi verme amacı taşımaktadır",
        TOOLTIP_DEVICELOG_MESSAGE: "Log mesajının içeriğini ifade eder",
        TOOLTIP_DEVICELOG_DEVICEID: "Cihazın kendine ait tanımlayıcısı",
        TOOLTIP_USEROPERATIONS_USERAUTHORISATION: "'ADMIN' Inviso-Admin ve cihaz üzerindeki tüm işlemlerde yetkiye sahiptir. 'REPORTER' şablon üzerinden belgeler tasarlayıp, rapor sonuçlarını alabilir. 'SUPERVISOR' görev işlemlerinden sorumludur. 'USER' ise yalnızca cihaza girebilir ve kendisine atanmış uygulamaları görüp tamamlayabilir",
        TOOLTIP_ADDEQUIPMENTGROUP_TABLENAME: "Aynı amaç için kullanılacak ekipmanları bir arada tutmak üzere bir ekipman grubu oluşturulur",
        TOOLTIP_ADDEQUIPMENT_TABLENAME: "Ekipmana verilen isim",
        TOOLTIP_ADDEQUIPMENT_TABLEDESCRIPTION: "Ekipman hakkında detaylı  bilgi",
        TOOLTIP_ADDEQUIPMENT_SERIALNUMBER: "Ekipmana ait seri numarası/barkod vb. 'unique' alanı ifade eder",
        TOOLTIP_ADDEQUIPMENT_EQUIPMENTTYPE: "Ekipmanı daha önce oluşturulan ekipman grubuna dahil eder",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLENAME: "Uygulamadaki tüm formların listesi",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEVERSION: "Seçilen formun aktif versiyonu",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEUSERS: "Seçilen form için daha önce 'Form Atama' ekranında yetkilendirilmiş kullanıcıların listesi",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLETASK: "Cihazda kullanıcının gördüğü görev adı",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEDESCRIPTION: "Görev hakkında detaylı bilgi",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEBARCODE: "Görev boyunca kontrol edilmesi beklenen ürüne ait 'unique' barkod/alan",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEEQUIPMENT: "Görevde kullanılmak üzere belirlenmiş ekipman grubu",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLESTARTDATE: "Göreve başlanması beklenen tarih.",
        TOOLTIP_ASSIGNTASKANDEQUIPMENT_STATUS: "Görevin o anki durum açıklaması",
        TOOLTIP_REPORT_REPORTRESULT_TRANSACTIONDATE: "Formun gönderim tarihi",
        TOOLTIP_REPORT_REPORTRESULT_ASSIGNMENTDATE: "Görev atanma tarihi (Eğer forma bir görev atanmışsa ve form bu görev üzerinden tamamlanmışsa)",
        TOOLTIP_REPORT_REPORTRESULT_USERNAME: "Formu tamamlayan kullanıcı",
        TOOLTIP_REPORT_REPORTRESULT_FORM: "Cihazda doldurulan ve gönderilmiş olan form",
        TOOLTIP_REPORT_REPORTRESULT_TASK: "Görev adı (Eğer forma bir görev atanmışsa ve form bu görev üzerinden tamamlanmışsa)",
        TOOLTIP_REPORT_REPORTRESULT_UNIQUEID: "Form üzerindeki 'unique' alan/alanlar",
        TOOLTIP_REPORT_REPORTRESULT_REPORT: "Tamamlanmış formdan rapor oluştur",
        TOOLTIP_REPORT_REPORTRESULT_DETAIL: "Tamamlanan formun tüm sayfalarını içerir",
        TOOLTIP_REPORT_REPORTRESULT__LOCATION: "Formun doldurulduğu yerin lokasyon bilgisini içerir",
        TOOLTIP_PALETTE_ADDVALIDATIONLINK: "Form servise gönderilmeden önce kullanıcının bilgisayarında form verilerinin validasyonunu sağlar",
        TOOLTIP_PALETTE_ADDEVENT_EVENTNAME: "HTML5 elemanlarında gerçekleşecek olan olayları içerir",
        TOOLTIP_PALETTE_ADDEVENT_FUNCTIONTYPE: "Statik fonksiyonlar, kullanıcı tarafından değiştirelemeyen, formu taslak olarak kaydetme ya da formu servise göndermeye yarayan fonksiyonları içeren fonksiyon türüdür.Kullanıcı tanımlı fonksiyonlar,kullanıcının fonksiyon ekleme sayfasında oluşturduğu fonksiyon türüdür.Navigasyon fonksiyonları,sayfa geçişlerini navigasyon bileşeni üzerinden yapmayı sağlayan fonksyionları içeren fonksiyon türüdür",
        TOOLTIP_PALETTE_ADDEVENT_FUNCTIONS: "Fonksiyonlar, HTML elemanları üzerindeki olaylar gerçekleştiğinde neler olması gerektiğini belirten metodlardır",
        TOOLTIP_PALETTE_ADDFUNCTION_FUNCTIONNAME: "Kullanıcı tanımlı fonksiyon türlerinde kullanılan fonksiyonlara verilen ismi simgeler",
        TOOLTIP_PALETTE_ADDFUNCTION_FUNCTIONDETAIL: "HTML elemanları üzerinde tanımlanan olaylar gerçekleştiğinde(tıklama,değiştirme vb.) form elemanın ne yapması gerektiğini belirten ve Javascript kodlarının yazıldığı kısımdır",
        TOOLTIP_PALETTE_ADDVALIDATION_NAME: "Form elemanları üzerinde tanımlanan validasyon isimleridir",
        TOOLTIP_PALETTE_ADDVALIDATION_VALUE: "Seçilmiş olan validasyonun değerini belitir",
        TOOLTIP_PALETTE_ADDVALIDATION_ERRORMESSAGE: "Validasyon sağlanmadığında gösterilecek mesajı içerir",
        TOOLTIP_PALETTE_PROPERTIES_UNIQUE: "'Rapor Sonuçları' sayfasındaki raporlarınızı bulmanıza yardımcı olan benzersiz formlar sağlar",
        DASHBOARD_REVENUE: "Form/Ay",
        FORM_VERSION_MENUTITLE: "Versiyon",
        FORM_ERRORMESSAGE_FORMSPAGE: "Atanmış form veya formlarınız bulunmamaktadır.",
        FORM_MESSAGEFORSAVEDSUCCESSFULY: "Veriler başarıyla kaydedildi.",
        FORM_MESSAGEFORDRAFTEDSUCCESSFULY: "Taslak veriler başarıyla kaydedildi.",
        FORM_ERRORMESSAGEFORSAVED: "Veriler kaydedilirken bir hata oluştu.Çevrimdışı olarak kaydedilmiştir.",
        FORM_INVALIDMESSAGEFORSAVED: "Alanlarda validasyon hatası bulunmakta! Lütfen kontrol ediniz.",
        FORM_NOTSUPPORTED_MESSAGE: "Bu fonksiyon desteklenmemektedir.",
        STATUS1_LISTINGTASKPAGE: "Tamamlanmadı",
        STATUS0_LISTINGTASKPAGE: "Tamamlandı",
        STATUS2_LISTINGTASKPAGE: "Gecikmiş",
        STATUS3_LISTINGTASKPAGE: "Zamanında",
        STATUS4_LISTINGTASKPAGE: "Kritik",
        TASKNAME_LISTTASKPAGE: "Görev Adı",
        TASKDESCRIPTION_LISTTASKPAGE: "Görev Tanımı",
        TASK_ASSIGNMENT_DATE: "Görev Atanma Tarihi",
        TASK_EXPIRE_DATE: "Görev Bitiş Tarihi",
        TASKSTATE_LISTTASKPAGE: "Görev Durumu",
        TASKBARCODE_LISTTASKPAGE: "Barkod",
        TASKEQUIPMENT_LISTTASKPAGE: "Ekipmanlar",
        TASKREJECT_LISTTASKPAGE: "Red Açıklaması",
        PALETTE_ADDFUNCTION_DELETESUCCESSFULLY: "Fonksiyon başarıyla silindi.",
        PALETTE_ADDFUNCTION_DELETEERROR: "Fonksiyon silme sırasında bir hata oluştu.",
        LOGIN_MODAL_FORGOTPASSWORD: "Şifremi unuttum",
        VALIDATION_MODAL_EXPRESSION: "Regular Expression",
        VALIDATION_MODAL_STRING: "Test String",
        VALIDATION_MODAL_CHECK_BUTTON: "Kontrol Et",
        VALIDATION_MODAL_TEST_TRUE_RESULT: "Eşleşti",
        VALIDATION_MODAL_TEST_FALSE_RESULT: "Eşleşmedi",
        VALIDATIONMODAL_TEST_REGEX: "Regex Verisini Test Et",
        FORGOTPASSWORD_SEND_BUTTON: "Gönder",
        CHANGEPASSWORD_NEXT_BUTTON: "İleri",
        CHANGEPASSWORD_CANCEL_BUTTON: "İptal",
        CHANGEPASSWORD_OLD: "Eski şifre",
        CHANGEPASSWORD_NEW: "Yeni şifre",
        CHANGEPASSWORD_VERIFY: "Yeni şifreyi doğrulayın",
        CHANGEPASSWORD_ERROR_NOTMATCH: "Şifreler eşlemiyor.",
        CHANGEPASSWORD_ERROR_INVALID_KEY: "Lütfen girilmiş olan linki kontrol ediniz.",
        CHANGEPASSWORD_ERROR_WRONGPASSWORD: "Yanlış şifre girdiniz.Tekrar deneyiniz.",
        CHANGEPASSWORD_ERRROR_FILLTHEFIELDS: "Tüm gerekli alanları doldurun.",
        CHANGEPASSWORD_SUCCESSMESSAGE: "Şifreniz değiştirilmiştir.",
        CHANGEPASSWORD_HEADER: "Şifrenizi oluşturun",
        CHANGEPASSWORD_ERRORMESSAGE: "Şifre değiştirme işlemi sırasında bir hata oluştu.",
        FORGOTPASSWORD_SEND_BUTTON: "Gönder",
        FORGOTPASSWORD_HEADER: "Şifrenizi sıfırlayın",
        FORGOTPASSWORD_SUCCESS: " {{email}} adresine sıfırlama linki gönderilmiştir.",
        FORGOTPASSWORD_ERROR: "Kullanıcı adı geçerli değildir.",
        FORGOTPASSWORD_ERROR_EMPTYUSERNAME: "Lütfen kullanıcı adını giriniz.",
        REPORT_DOCUMENTMODAL_STATUS: "Durumu",
        REPORT_DOCUMENTMODAL_STATUS_DOWNLOADABLE: "İndirilebilir",
        REPORT_DOCUMENTMODAL_STATUS_PREPARING: "Hazırlanıyor",
        REPORT_DOCUMENTMODAL_STATUS_CORRUPTED: "Hatalı",
        ALLDOCUMENT_OTHER_DOCUMENT_TYPE: "Diğer",
        DATASOURCE_NAME: "İsim",
        DATASOURCE_TYPE: "Tip",
        DATASOURCE_ENDPOINT: "Endpoint ",
        DATASOURCE_VALIDATE_BUTTON: "Onayla",
        DATASOURCE_ADDLIST_BUTTON: "Listeye Ekle",
        DATASOURCE_TYPE_SELECT_TEXT: "Tüm Tipler",
        DATASOURCE_SEARCH_NAME: "İsim Ara",
        DATASOURCE_ERROR_EMPTY_FIELD: "Lütfen tüm alanları doldurunuz.",
        DATASOURCE_ERROR_UNVERIFIED: "Reponse verisi doğrulanamamıştır.",
        DATASOURCE_SUCCESS_VERIFIED: "Doğrulanmıştır.",
        DATASOURCE_ADD_ERRORMESSAGE: "Ekleme işlemi sırasında bir hata oluştu.",
        DATASOURCE_REMOVE_ERRORMESSAGE: "Silme işlemi sırasında bir hata oluştu.",
        DATASOURCE_REMOVE_SUCCESSMESSAGE: "Başarıyla silinmiştir.",
        DATASOURCE_ADD_SUCCESSMESSAGE: "Başarıyla kaydedilmiştir.",
        DATASOURCE_MODAL_MESSAGE: "Eklediğiniz veriler kaybolacaktır.Değiştirmek istediğinize emin misiniz?",
        DATASOURCE_ERROR_ILLEAGALURI: "Hatalı URI",
        DATASOURCE_ERROR_TIMEOUT_UNREACHABLE: "WebService erişilemiyor veya  zaman aşımına uğramış olabilir.",
        DATASOURCE_ERROR_SOME_ERROR_OCCURED: "Hata oluştu.",
        DEVICE_ID: "Cihaz UUID",
        DEVICE_CREATEDBY: "Ekleyen",
        DEVICE_UUIDREQUIRED: "Bu alanın doldurulması zorunludur.",
        DEVICE_DEVICEALREADYADDED: "Bu cihazı daha önce eklemiştiniz.",
        DEVICE_MAXNUMBERWARN: "Maksimum lisanslı cihaz sayısına ulaşılmıştır.",
        DEVICE_DELETE_SUCCESSMESSAGE: "Başarıyla silinmiştir.",
        DEVICE_DELETE_ERRORMESSAGE: "Silme işlemi sırasında bir hata oluştu.",
        DEVICE_ADD_SUCCESSMESSAGE: "Başarıyla kaydedilmiştir.",
        DEVICE_ADD_ERRORMESSAGE: "Ekleme işlemi sırasında bir hata oluştu.",
        TASK_COMPLETED: "Tamamlandı",
        TASK_INCOMPLETED: "Tamamlanmadı",
        TASK_LATE: "Gecikmiş",
        TASK_ONTIME: "Zamanında",
        TASK_CRITICAL: "Kritik",
        EMPTY_GALLERY_MESSAGE: "Yüklenmiş resim bulunmamaktadır.",
        OPTION_ERROR_VALUE: "Lütfen 'false' değerinden başka bir değer giriniz.",
        DASHBOARD_COMPLETE_FORM: " Tamamlanmış Form",
        DASHBOARD_COMPLETE_TASK: "Tamamlanmış Görev",
        DASHBOARD_INCOMPLETE_TASK: "Tamamlanmamış Görev",
        DASHBOARD_BARCHAR_HEADER_FREE_FORM: "FORMLAR",
        DASHBOARD_BARCHAR_HEADER_TASK_FORM: "GÖREVLER",
        DASHBOARD_BARCHAR_DESCRIPTION_FOR_TASK_FORM: "Görevli kişilerin formların form tamamlama sayıları aşağıda gösterilmektedir.",
        DASHBOARD_BARCHAR_DESCRIPTION_FOR_FREE_FORM: "Görevlendirilmeyen kişilerin formların form tamamlama sayıları aşağıda gösterilmektedir.",
        DASHBOARD_CRITICAL_PERCENTAGE: "Kritik Yüzdesi",
        DASHBOARD_FILTER_LAST_1_WEEK: "SON 1 HAFTA",
        DASHBOARD_FILTER_LAST_1_MONTH: "SON 1 AY",
        DASHBOARD_FILTER_LAST_3_MONTH: "SON 3 AY",
        CHARACTER_LIMITATION_ERRORMESSAGE: "Lütfen en fazla 10.000 karakter giriniz.",
        CHARACTER_LIMITATION_ERRORMESSAGE_APPLICATION_NAME_DESCRIPTION: "Lütfen form adı veya açıklamasında en fazla 10.000 karakter giriniz.",
        SENDASSIGNMENT_BACK_USERNAME: "Atanmış Kullanıcı",
        SENDASSIGNMENT_BACK_EXPIRE_DATE: "Görevin Bitiş Süresi",
        SENDASSIGNMENT_BACK_REJECTION_HEADER: "Geri Gönderme Bilgileri",
        SENDASSIGNMENT_BACK_REJECTION_REASON: "Geri Gönderme Nedeni",
        SENDASSIGNMENT_BACK_REJECT_BUTTON: "Geri Gönder",
        REPORT_PARAMETERS_ACTIVE: "Aktif",
        REPORT_PARAMETERS_ARCHIVE: "Arşiv",
        REPORT_STATUS_REJECTED: "Reddedildi.",
        REPORT_STATUS_APPROVED: "Onaylandı.",
        REPORT_RESULT_CONFIRM_MESSAGE_APPROVE: "Raporu onaylamak istediğinizden emin misiniz?",
        REPORT_RESULT_SUCCESS_APPROVE_MESSAGE: "Rapor başarılıyla onaylanmıştır.",
        REPORT_RESULT_ERROR_APPROVE_MESSAGE: "Rapor onaylama işlemi sırasında bir hata oluştu.",
        REPORT_RESULT_SUCCESS_REJECT_MESSAGE: "Rapor geri gönderme işlemi başarıyla gerçekleştirilmiştir.",
        REPORT_RESULT_ERROR_REJECT_MESSAGE: "Rapor geri gönderme işlemi sırasında bir hata oluştu.",
        REPORT_EXPORT_BUTTON: "Tetikle CSV",
        REPORT_DOWNLOAD_BUTTON: "Son Üretilen CSV Raporu İndir",
        REPORT_EXPORT_EXCEL_BUTTON: "Tetikle Excel",
        REPORT_DOWNLOAD_EXCEL_BUTTON: "Son Üretilen Excel Raporu İndir",
        REPORT_EXPORT_ERROR: "Dışa aktarma işlemi sırasında bir hata oluştu.",
        TASK_EQUIPMENT_ERROR_MESSAGE: "Bu göreve atanmış ekipman bulunmamaktadır.",
        TASK_EQUIPMENT_MODAL_NAMES: "Ekipman İsimleri",
        ROW_LIMITATION_ERROR: "Satır sayısı 50'yi geçtiğinden yeni satır eklenememektedir.",
        REPORT_DESIGN_SELECT_PARAMETER: "Parametre Seç",
        REPORT_LEAVE_BLANK_ERROR: "Lütfen parametre ve rapor veri alanlarını boş bırakmayınız.",
        REPORT_GO_BACK_ERROR: "Verileriniz kaybolacaktır.Geri gitmek istediğinize emin misiniz?",
        OPENAPP_ERROR: "Formu açma işlemi sırasında bir hata oluştu.",
        COPIED_INFO: "Kopyalandı!",
        UPLOAD_ERROR_MESSAGE: "Dosya yükleme işlemi sırasında hata oluştu.",
        DETAIL_CAMERAMODAL_DESCRIPTION: "RESİM TANIMI",
        DETAIL_CAMERAMODAL_UPLOAD_BUTTON: "Resim yükle",
        PALETTE_ADDNOTIFICATION: "Notifikasyon Ekle",
        SEARCH_FORM_PLACEHOLDER: "Form Ara"
    };
! function() {
    "use strict";

    function e(e, t, a, o, n, i) {
        e.setComponentsColSize = function(e, t, a) {
            2 == e.forms[t].rows[a].components.length && "" == e.forms[t].rows[a].components[0].colSize && "" == e.forms[t].rows[a].components[1].colSize && (e.forms[t].rows[a].components[0].colSize = "col-33", e.forms[t].rows[a].components[1].colSize = "col-67")
        }, e.setInputValue = function(e, t) {
            void 0 === a.formData[t] && (a.formData[t] = e)
        }, e.initializeComponentValue = function(e, t) {
            a.isFormViewed || void 0 === a.formData[e] && (a.formData[e] = t)
        }, e.openMultipleSelectModal = function(t) {
            e.component = t, e.isFormShowed = !1, o.open({
                animation: !1,
                scope: e,
                templateUrl: "app/pages/report/report-result/multipleSelectModal/multipleSelectModal.html"
            })
        }, e.getNumberOfSelectedOption = function(e) {
            var t = 0;
            return angular.forEach(e, (function(e, a) {
                "false" != e && t++
            })), 0 == t ? "Nothing selected" : t + " selected"
        }, e.setTextStyle = function(e) {
            return fontSize = Number(fontSize) + "px", {
                "font-size": fontSize + " !important"
            }
        }, e.createHTMLForText = function(e) {
            return i.createHTMLForText(e)
        }, e.createHTMLForImage = function(e) {
            return i.createHTMLForImage(e)
        }, e.openInformationModal = function(a) {
            if (null != a)
                for (var i = 0; i < a.length; i++) e.informationModalContent = a[i].key;
            if (t.hasImageSrc(e.informationModalContent)) {
                for (var s = [], r = [], l = [], c = "", d = /<img.*?src="([^">]*\/([^">]*?))".*?>/g; s = d.exec(e.informationModalContent);) l.push(s[1]), r.push(s[2]);
                for (i = 0; i < l.length; i++) c = n.get("imagePath") + "/" + r[i], e.informationModalContent = e.informationModalContent.replace(l[i], c)
            }
            o.open({
                animation: !1,
                scope: e,
                controller: "informationModalCTRL",
                templateUrl: "app/pages/forms/informationModal/information-modal.html"
            })
        }
    }
    e.$inject = ["$scope", "formService", "$rootScope", "$uibModal", "$cookies", "Core"], angular.module("BlurAdmin.pages").controller("formPageCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.user = {}, e.message = "", e.isMessageSent = !1, e.messageSuccess = !1, e.messageError = !1, e.goToLoginPage = function() {
            i.location = "login.html"
        }, e.sendResetKeyToUser = function() {
            e.isMessageSent = !0;
            var n = {};
            n.userName = e.user.userName, n.serverURI = s, console.log("Username:" + e.user.userName), t.serviceWithoutToken("POST", a, {}, n).then((function(t) {
                e.isMessageSent = !1, e.email = t, e.message = o("translate")("FORGOTPASSWORD_SUCCESS", {
                    email: t
                }), e.messageSuccess = !0, e.messageError = !1
            }), (function(t) {
                e.isMessageSent = !1, 406 == t.status && (e.message = o("translate")("FORGOTPASSWORD_ERROR"), e.messageError = !0, e.messageSuccess = !1)
            }))
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "forgotPasswordURL", "$filter", "$translate", "$window", "mailConfigURL"], angular.module("BlurAdmin.login").controller("forgotPasswordCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d) {
        e.userCredentials = {}, e.errorMessage = "", e.selectedLanguage = s.use(), e.changeLanguage = function() {
            localStorage.setItem("selectedLanguage", e.selectedLanguage), s.use(e.selectedLanguage)
        }, e.openForgotPasswordModal = function() {
            d.open({
                animation: !1,
                controller: "forgotPasswordCTRL",
                templateUrl: "app/login/forgotPassword/forgotPassword.html"
            })
        }, e.login = function() {
            console.log("Username:" + e.userCredentials.username + " Password:" + i.createHash(e.userCredentials.password)), document.cookie = "isUserRootAdmin=0", "" == e.userCredentials.username || "" == e.userCredentials.password ? e.errorMessage = r("translate")("LOGINPAGE_ERROR_EMPTYFIELD") : n.authenticate(e.userCredentials.username, i.createHash(e.userCredentials.password)).then((function(t) {
                if (t) {
                    e.errorMessage = "", console.log("Token:", t);
                    var n = e.userCredentials.username;
                    l.service("POST", c.getUserInformationURL, {}, n).then((function(t) {
                        if (console.log("userInformation", t), void 0 !== t.isAdmin) {
                            var n = "isUserRootAdmin=" + t.isAdmin;
                            document.cookie = n
                        } else document.cookie = "isUserRootAdmin=0";
                        a.setUserRoles(e.userCredentials.username, t.roles), o.location.href = "../admin/"
                    }))
                } else e.errorMessage = r("translate")("LOGINPAGE_ERROR_WRONGUSERORPASSWORD")
            }))
        }
    }
    e.$inject = ["$scope", "$cookies", "Core", "$window", "LoginService", "md5", "$translate", "$filter", "serviceImplementation", "profileURLs", "$uibModal"], angular.module("BlurAdmin.login").controller("LoginCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        return {
            authenticate: function(a, r) {
                var c = t.defer(),
                    d = btoa("mfc:secret");
                s.username = a, s.password = r;
                var p = {
                    method: "POST",
                    url: l + i.url,
                    headers: {
                        Authorization: "Basic " + d,
                        "Content-type": " application/x-www-form-urlencoded"
                    },
                    data: o(s)
                };
                return e(p).then((function(e) {
                    console.log("Authentication res:", e), console.log("Authentication res data:", e.data), n.put("token", e.data.access_token), console.log("Authenticated. Token :" + e.data.access_token), c.resolve(!0)
                }), (function(e) {
                    c.resolve(!1)
                })), c.promise
            },
            logout: function() {
                c.service("POST", i.logoutURL, {}, {}).then((function(e) {
                    console.log(e), r.location = "login.html", Core.removeCookiesAndLocalStorageVariables()
                }), (function(e) {
                    r.location = "login.html", Core.removeCookiesAndLocalStorageVariables()
                }))
            }
        }
    }
    e.$inject = ["$http", "$q", "$rootScope", "$httpParamSerializer", "$cookies", "authenticationURL", "authenticationHeader", "$window", "connectionConfigURL", "serviceImplementation"], angular.module("BlurAdmin.login").factory("LoginService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i) {
        e.passwordDetail = {
            newPassword: "",
            verifyPassword: ""
        }, e.message = "", e.isNewPasswordSaved = !1, e.IsValid = function() {
            return "" == e.passwordDetail.newPassword || "" == e.passwordDetail.verifyPassword
        }, e.goToLoginPage = function() {
            i.location = "login.html"
        }, e.changePassword = function() {
            if (console.log("in save method.."), e.passwordDetail.newPassword == e.passwordDetail.verifyPassword) {
                var i = {};
                i.value = a.createHash(e.passwordDetail.newPassword), i.key = passwordKey;
                var s;
                s = i, o.serviceWithoutToken("POST", t.savePasswordURL, {}, s).then((function(t) {
                    "406" == t ? e.message = n("translate")("CHANGEPASSWORD_ERROR_INVALID_KEY") : (e.message = "", e.isNewPasswordSaved = !0), console.log("savePasswordURL success..")
                }), (function(e) {}))
            } else e.error = !0, e.success = !1, e.message = n("translate")("CHANGEPASSWORD_ERROR_NOTMATCH")
        }
    }
    e.$inject = ["$scope", "passwordURLs", "md5", "serviceImplementation", "$filter", "$window"], angular.module("BlurAdmin.password").controller("PasswordCTRL", e)
}(),
function() {
    "use strict";

    function e(e, a, o) {
        o.decorator("$uiViewScroll", t)
    }

    function t(e, t, a) {
        return function(o) {
            a.hasAttr(o, "autoscroll-body-top") ? t() : e(o)
        }
    }
    e.$inject = ["baConfigProvider", "colorHelper", "$provide"], t.$inject = ["$delegate", "$anchorScroll", "baUtil"], angular.module("BlurAdmin.theme").config(e)
}(),
function() {
    "use strict";
    g.$inject = ["colorHelper"];
    var e = "#ffffff",
        t = "#666666",
        a = "#dddddd",
        o = "#aaaaaa",
        n = "#209e91",
        i = "#2dacd1",
        s = "#90b900",
        r = "#dfb81c",
        l = "#e85656",
        c = "#005562",
        d = "#0e8174",
        p = "#6eba8c",
        m = "#b9f2a1",
        u = "#10c4b5";

    function g(g) {
        var E = {
            theme: {
                blur: !1
            },
            colors: {
                default: e,
                defaultText: t,
                border: a,
                borderDark: o,
                primary: n,
                info: i,
                success: s,
                warning: r,
                danger: l,
                primaryLight: g.tint(n, 30),
                infoLight: g.tint(i, 30),
                successLight: g.tint(s, 30),
                warningLight: g.tint(r, 30),
                dangerLight: g.tint(l, 30),
                primaryDark: g.shade(n, 15),
                infoDark: g.shade(i, 15),
                successDark: g.shade(s, 15),
                warningDark: g.shade(r, 15),
                dangerDark: g.shade(l, 15),
                dashboard: {
                    blueStone: c,
                    surfieGreen: d,
                    silverTree: p,
                    gossip: m,
                    white: u
                }
            },
            changeTheme: function(e) {
                angular.merge(E.theme, e)
            },
            changeColors: function(e) {
                angular.merge(E.colors, e)
            },
            $get: function() {
                return delete E.$get, E
            }
        };
        return E
    }
    angular.module("BlurAdmin.theme").provider("baConfig", g)
}(),
function() {
    "use strict";
    var e = "assets/img/";

    function t(e, t, a) {
        function o(e) {
            return parseInt(e, 16)
        }
        for (var n = "#", i = 1; i < 7; i += 2) {
            var s = o(e.substr(i, 2)),
                r = o(t.substr(i, 2));
            n += ("0" + Math.floor(r + a / 100 * (s - r)).toString(16)).slice(-2)
        }
        return n
    }
    angular.module("BlurAdmin.theme").constant("layoutSizes", {
        resWidthCollapseSidebar: 1200,
        resWidthHideSidebar: 500
    }).constant("layoutPaths", {
        images: {
            root: e,
            profile: "assets/img/app/profile/",
            amMap: "assets/img/theme/vendor/ammap//dist/ammap/images/",
            amChart: "assets/img/theme/vendor/amcharts/dist/amcharts/images/"
        }
    }).constant("colorHelper", {
        tint: function(e, a) {
            return t("#ffffff", e, a)
        },
        shade: function(e, a) {
            return t("#000000", e, a)
        }
    })
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        var r = [o.loadAmCharts(), e(3e3)],
            l = s;
        l.blur && (l.mobile ? r.unshift(o.loadImg(a.images.root + "blur-bg-mobile.jpg")) : (r.unshift(o.loadImg(a.images.root + "blur-bg.jpg")), r.unshift(o.loadImg(a.images.root + "blur-bg-blurred.jpg")))), n.all(r).then((function() {
            t.$pageFinishedLoading = !0
        })), e((function() {
            t.$pageFinishedLoading || (t.$pageFinishedLoading = !0)
        }), 7e3), t.$baSidebarService = i
    }
    e.$inject = ["$timeout", "$rootScope", "layoutPaths", "preloader", "$q", "baSidebarService", "themeLayoutSettings"], angular.module("BlurAdmin.theme").run(e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(navigator.userAgent.toLowerCase()),
            a = t ? "mobile" : "",
            o = e.theme.blur ? "blur-theme" : "";
        return angular.element(document.body).addClass(a).addClass(o), {
            blur: e.theme.blur,
            mobile: t
        }
    }
    e.$inject = ["baConfig"], angular.module("BlurAdmin.theme").service("themeLayoutSettings", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        function r() {
            var t = {
                day: parseInt(o.dateFilter.value)
            };
            i.service("GET", n.getCountOfFreeForm, t, {}).then((function(a) {
                for (var o = "", n = [], i = [], r = 0; r < a.completedList.length; r++) n.push(a.completedList[r].count), o = "7" == t.day ? s("date")(a.completedList[r].startDate, "dd/MM/yyyy") : s("date")(a.completedList[r].startDate, "dd/MM/yyyy") + "-" + s("date")(a.completedList[r].endDate, "dd/MM/yyyy"), i.push(o);
                e.freeFormBarData.series[0] = n, e.freeFormBarData.labels = i, l()
            }))
        }

        function l() {
            new Chartist.Bar("#task-form-bar", e.taskFormBarData, e.simpleBarOptions), new Chartist.Bar("#free-form-bar", e.freeFormBarData, e.simpleBarOptions)
        }
        o.dateFilter = {
            value: "7"
        }, e.simpleBarOptions = {
            height: "300px"
        }, e.freeFormBarData = {
            labels: [],
            series: []
        }, e.taskFormBarData = {
            labels: [],
            series: []
        }, r(), e.changeDateFilter = function() {
            r()
        }
    }
    e.$inject = ["$scope", "connectionConfigURL", "$timeout", "$rootScope", "dashboardURLs", "serviceImplementation", "$filter"], angular.module("BlurAdmin.pages.dashboard").controller("dashboardCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        function r() {
            e.password = {
                old_password: "",
                new_password: "",
                verify_password: ""
            }
        }
        r(), e.error = {}, e.error.notMatch = !1, e.error.wrongPassword = !1, e.error.fillTheFields = !1, e.changePassword = function() {
            if ("" == e.password.old_password || "" == e.password.new_password || "" == e.password.verify_password) e.errorFillTheFields = t("translate")("CHANGEPASSWORD_ERRROR_FILLTHEFIELDS"), e.error.fillTheFields = !0;
            else if (e.error.fillTheFields = !1, e.password.new_password != e.password.verify_password) e.errorNotMatchMessage = t("translate")("CHANGEPASSWORD_ERROR_NOTMATCH"), e.error.notMatch = !0;
            else {
                var l = {},
                    c = {};
                c.key = s.createHash(e.password.old_password), c.value = s.createHash(e.password.new_password), l.userName = i.get("username"), l.password = c, a.service("POST", o, {}, l).then((function(a) {
                    406 == a ? (e.errorWrongPasswordMessage = t("translate")("CHANGEPASSWORD_ERROR_WRONGPASSWORD"), e.error.wrongPassword = !0, e.error.notMatch = !1) : (n.success(t("translate")("CHANGEPASSWORD_SUCCESSMESSAGE"), ""), e.error.wrongPassword = !1, e.error.notMatch = !1, r())
                }), (function() {
                    n.error(t("translate")("CHANGEPASSWORD_ERRORMESSAGE"), "")
                }))
            }
        }
    }
    e.$inject = ["$scope", "$filter", "serviceImplementation", "changePasswordURL", "toastr", "$cookies", "md5"], angular.module("BlurAdmin.pages.change-password").controller("ChangePasswordCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        return {
            restrict: "A",
            priority: 1e3,
            terminal: !0,
            link: {
                post: function(e, o, n) {
                    var i = t(n.metadata)(e);
                    if (e.haveHeader = !1, e.buttonName = {}, e.buttonStyle = {}, e.buttonColor = {}, e.buttonSize = {}, null != i && 0 != i.length)
                        for (var s = 0; s < i.length; s++) switch (i[s].name) {
                            case "textValue":
                                e.setInputValue(i[s].key, e.shortName);
                                break;
                            case "header":
                                e.haveHeader = !0, e.header = i[s].key;
                                break;
                            case "isUnique":
                                "true" == i[s].key && -1 == a.uniqueComponent.indexOf(e.shortName) && a.uniqueComponent.push(e.shortName);
                                break;
                            case "buttonName":
                                e.buttonName[e.shortName] = i[s].key;
                                break;
                            case "color":
                                e.buttonColor[e.shortName] = i[s].key;
                                break;
                            case "style":
                                e.buttonStyle[e.shortName] = i[s].key;
                                break;
                            case "size":
                                e.buttonSize[e.shortName] = i[s].key;
                            default:
                                "Option" != i[s].type && ("readonly" != i[s].name || "false" != i[s].key && "" != i[s].key ? "" != i[s].name && o.attr(i[s].name, i[s].key) : o.removeAttr("readonly"))
                        }
                },
                pre: function(t, a, o) {
                    a.removeAttr("metadata"), e(a[0])(t)
                }
            }
        }
    }
    e.$inject = ["$compile", "$parse", "$rootScope"], angular.module("BlurAdmin.pages").directive("metadata", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n) {
        var i = "";
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            link: {
                pre: function(e, a, o) {
                    var n, s, r = t.formComponent.attributes,
                        l = "";
                    if (i = "<div>", i += '<input type="button"  style="width:100%" click-once', null != r.options && 0 != r.options)
                        for (var c = 0; c < r.options.length; c++) switch (r.options[c].name) {
                            case "color":
                                n = r.options[c].key;
                                break;
                            case "style":
                                l = r.options[c].key;
                                break;
                            case "size":
                                s = r.options[c].key;
                                break;
                            default:
                                i += " ", i += r.options[c].name + "=", i += '"' + r.options[c].key + '"'
                        }
                    if (null != r.events && 0 != r.events)
                        for (c = 0; c < r.events.length; c++) {
                            i += " ", i += r.events[c].type + '="';
                            for (var d = 0; d < r.events[c].functions.length; d++) r.events[c].functions[d].functionDetail, i += r.events[c].functions[d].functionDetail, r.events[c].functions.length > 1 && (i += ";");
                            i += '"'
                        }
                    i += ' class="button ' + l + " " + n + " " + s + ' "  ></div>', a.html(i)
                },
                post: function(e, t, o) {
                    a(t.contents())(e)
                }
            }
        }
    }
    e.$inject = ["$state", "$rootScope", "$compile", "$ionicLoading", "$timeout"], angular.module("BlurAdmin.pages").directive("componentButton", e)
}(),
function() {
    "use strict";

    function event($parse, $state, $rootScope, $compile) {
        return {
            restrict: "A",
            scope: !1,
            link: function(scope, element, attr) {
                if ($rootScope.isInAdminFormPage) {
                    var functionDetails = [],
                        events = $parse(attr.event)(scope);
                    if (events.length > 0)
                        for (var i = 0; i < events.length; i++) {
                            for (var j = 0; j < events[i].functions.length; j++) {
                                var detail = events[i].functions[j].functionDetail;
                                functionDetails.push(detail)
                            }
                            bindEvent(events[i].type, functionDetails), functionDetails = []
                        }

                    function bindEvent(event, functionDetail) {
                        "ng-init" == event || "ng-show" == event ? (console.log("functionDetail", functionDetail), eval(functionDetail[i])) : element.bind(event, (function() {
                            for (var i = 0; i < functionDetail.length; i++) {
                                var startString = functionDetail[i].substring(0, 6);
                                if ("$state" === startString) {
                                    var pageShortName = functionDetail[i].substring(11, functionDetail[i].lastIndexOf('"'));
                                    $rootScope.pageShortName = pageShortName, $rootScope.pageHistory.push($rootScope.pageShortName), $state.reload()
                                } else "submit" === startString ? eval(scope[functionDetail[i]]) : "fillIl" === startString ? eval("scope." + functionDetail[i]) : (console.log("functionDetail", functionDetail), eval(functionDetail[i]))
                            }
                        }))
                    }
                }
            }
        }
    }
    event.$inject = ["$parse", "$state", "$rootScope", "$compile"], angular.module("BlurAdmin.pages").directive("event", event)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        return {
            restrict: "A",
            scope: !1,
            link: function(n, d, p) {
                d.bind("change", (function(d) {
                    n.$apply((function() {
                        if (e.isLoadingOnFormPage = !0, e.fileread = d.target.files[0], e.fileName = e.fileread.name, console.log("filename:  " + e.fileread.name), angular.equals(t.current.name, "form")) {
                            var m = a(p.fileread)(n);
                            e.isImageUploaded = !1, e.fileread = d.target.files[0];
                            var u = new FileReader;
                            u.onload = function(t) {
                                n.$apply((function() {
                                    var t = {};
                                    t.type = o.INFO_PICTURES, t.applicationId = c.id, s.uploadService(e.fileread, i.uploadURL, t).then((function(returnedFileName) {
                                        // console.log(data, "***********************************************");
                                        e.isLoadingOnFormPage = !1, "Camera" == m.type ? (void 0 === e.formData[m.shortName] ? (e.formData[m.shortName] = [], e.formData[m.shortName].push({
                                            name: returnedFileName
                                        }), n.checkRequiredValidationOfCamera(m.shortName)) : (e.formData[m.shortName].push({
                                            name: returnedFileName
                                        }), n.checkRequiredValidationOfCamera(m.shortName)), e.fileName = "") : e.isImageUploaded = !0, e.fileName = returnedFileName
                                    }), (function(e) {
                                        r.error(l("translate")("UPLOAD_ERROR_MESSAGE"), ""), n.isLoading = !1
                                    }))
                                }))
                            }, u.readAsDataURL(e.fileread)
                        }
                    }))
                }))
            }
        }
    }
    e.$inject = ["$rootScope", "$state", "$parse", "documentType", "$cookies", "paletteURL", "serviceImplementation", "toastr", "$filter", "Application"], angular.module("BlurAdmin.pages").directive("fileread", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            restrict: "A",
            link: function(t, a, o) {
                e((function() {
                    a[0].focus()
                }), 300)
            }
        }
    }
    e.$inject = ["$timeout"], angular.module("BlurAdmin.pages").directive("setFocusDefault", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            require: "ngModel",
            link: function(t, a, o, n) {
                for (var i = e(o.stringToNumber)(t), s = 0; s < i.length; s++) "date" == i[s].key && (n.$parsers.push((function(e) {
                    return "" + e
                })), n.$formatters.push((function(e) {
                    return new Date(e)
                })))
            }
        }
    }
    e.$inject = ["$parse", "$rootScope"], angular.module("BlurAdmin.pages").directive("stringToDate", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            require: "ngModel",
            link: function(a, o, n, i) {
                var s = e(n.stringToJson)(a);
                console.log(typeof t.formData[s.shortName]), console.log("$rootScope.formData[component.shortName]", t.formData[s.shortName]);
                try {
                    t.formData[s.shortName] = JSON.parse(t.formData[s.shortName])
                } catch (e) {}
                console.log(typeof t.formData[s.shortName])
            }
        }
    }
    e.$inject = ["$parse", "$rootScope"], angular.module("BlurAdmin.pages").directive("stringToJson", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            require: "ngModel",
            link: function(t, a, o, n) {
                var i = e(o.stringToNumber)(t);
                if (angular.isArray(i))
                    for (var s = 0; s < i.length; s++) "number" == i[s].key && (n.$parsers.push((function(e) {
                        return "" + e
                    })), n.$formatters.push((function(e) {
                        return parseFloat(e, 10)
                    })));
                else n.$parsers.push((function(e) {
                    return parseFloat(e, 10)
                })), n.$formatters.push((function(e) {
                    return parseFloat(e, 10)
                }))
            }
        }
    }
    e.$inject = ["$parse"], angular.module("BlurAdmin.pages").directive("stringToNumber", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        return {
            restrict: "A",
            priority: 1001,
            terminal: !0,
            link: {
                post: function(o, n, i) {
                    if (a.isInAdminFormPage) {
                        o.message = {};
                        var s = t(i.validation)(o),
                            r = s.validations;
                        if (0 != r.length)
                            for (var l = 0; l < r.length; l++) 2 == r[l].id ? "MultiSelectBox" == s.type || "CheckBox" == s.type ? (a.minCheckNumber[o.shortName] = 1, o.checkMultiOptionsValidation(o.shortName)) : a.requiredValidation[o.shortName] = !0 : 5 == r[l].id ? (a.minCheckNumber[o.shortName] = r[l].value, o.checkMultiOptionsValidation(o.shortName)) : 6 == r[l].id ? (a.maxCheckNumber[o.shortName] = r[l].value, o.checkMultiOptionsValidation(o.shortName)) : 7 == r[l].id ? (a.minTextNumberValue[o.shortName] = r[l].value, o.checkTextTypeNumberValidation(o.shortName)) : 8 == r[l].id ? (a.maxTextNumberValue[o.shortName] = r[l].value, o.checkTextTypeNumberValidation(o.shortName)) : 9 == r[l].id ? (a.matchedString[o.shortName] = r[l].value, o.checkWhetherStringMatches(o.shortName)) : 10 == r[l].id ? o.checkRequiredValidationOfCamera(o.shortName) : (n.attr(r[l].name, r[l].value), console.log(r[l].name + ":" + r[l].value), void 0 !== a.requiredValidation[o.shortName] && 1 == a.requiredValidation[o.shortName] || (a.requiredValidation[o.shortName] = !1)), "ng-minlength" == r[l].name ? o.message.minlength = r[l].errorMessage : "ng-maxlength" == r[l].name && (o.message.maxlength = r[l].errorMessage), o.message[r[l].name] = r[l].errorMessage, a.componentValidationType[s.shortName] = r[l].type;
                        else a.requiredValidation[o.shortName] = !1
                    }
                    e(n[0])(o)
                },
                pre: function(t, a, o) {
                    a.removeAttr("validation"), e(a[0])(t)
                }
            }
        }
    }
    e.$inject = ["$compile", "$parse", "$rootScope"], angular.module("BlurAdmin.pages").directive("validation", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d) {
        e.userCredentials = {}, e.login = function() {
            "" == e.userCredentials.username || void 0 === e.userCredentials.username || "" == e.userCredentials.password || void 0 === e.userCredentials.password ? e.errorMessage = r("translate")("LOGINPAGE_ERROR_EMPTYFIELD") : (e.isLoading = !0, o.authenticate(e.userCredentials.username, s.createHash(e.userCredentials.password)).then((function(o) {
                if (e.isLoading = !1, o) {
                    console.log("Token:", o);
                    var s = e.userCredentials.username;
                    n.service("POST", i.getUserInformationURL, {}, s).then((function(o) {
                        a.close(), c.setUserRoles(e.userCredentials.username, o.roles);
                        var n = d.current.url;
                        "/palette" != n && "/addContentToInfoComponent" != n && "/addEvent" != n && "/addTextContent" != n && "/form" != n && "/reportDesign" != n && (d.go(d.current, {}, {
                            reload: !0
                        }), t.isStatusSet = !1)
                    }))
                } else e.errorMessage = r("translate")("LOGINPAGE_ERROR_WRONGUSERORPASSWORD")
            }), (function() {
                e.isLoading = !1
            })))
        }, e.openForgotPasswordModal = function() {
            l.location = "forgot-password.html"
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "LoginService", "serviceImplementation", "profileURLs", "md5", "$filter", "$window", "Core", "$state"], angular.module("BlurAdmin.pages").controller("loginModalCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        r.changePreLoaderColor(), o.isStatusSet ? e.isLoading = !1 : e.isLoading = !0, e.search = {
            formName: ""
        };
        var d = a.get("username");
        t.service("POST", c.getUserApplicationNames, {}, d).then((function(t) {
            e.isLoading = !1, e.userForms = t
        })), e.goFormPage = function(a) {
            i.setDefaultFormVariables(), e.isLoading = !0;
            var r = {};
            r.applicationId = parseInt(a.value), t.service("POST", l.getApplicationsURL, {}, r).then((function(a) {
                e.isLoading = !1, console.log("App:", a), o.userForm = a[0], o.selectedFormVersion = a[0].version.version, s.id = o.userForm.id, s.name = o.userForm.name, s.version = o.userForm.version, s.shortName = o.userForm.shortName, s.description = o.userForm.description, s.userApplicationId = o.userForm.userApplicationId, s.pages = o.userForm.pages, o.formData = {};
                var r = {
                    applicationId: s.id
                };
                console.log("dataDraftFormData", r), o.draftDataExist = !1, t.service("POST", c.getDataDraftURL, {}, r).then((function(e) {
                    try {
                        var t = JSON.parse(e.serializedData),
                            a = Object.keys(t);
                        angular.forEach(a, (function(e) {
                            if (-1 != e.indexOf("CheckBox") || -1 != e.indexOf("MultiSelectBox")) try {
                                t[e] = JSON.parse(t[e])
                            } catch (e) {
                                console.error("e", e)
                            }
                        })), o.formData = t, console.log("Draft applied", t), o.draftDataExist = !0
                    } catch (e) {}
                }), (function(e) {})), o.userAssignmentId = "";
                for (var l = 0; l < o.userForm.pages.length; l++) o.userForm.pages[l].homePage && (o.pageHistory.push(o.userForm.pages[l].shortName), o.pageData = i.getPageData(o.userForm.pages[l].shortName));
                o.isPageFromTask = !1, o.isFormViewed = !1, n.go("form")
            }))
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "$cookies", "$rootScope", "$state", "formService", "Application", "Core", "ReportServiceURLs", "formURLs"], angular.module("BlurAdmin.pages.forms").controller("allFormCTRL", e)
}(),
function() {
    "use strict";

    function formCTRL($scope, $q, serviceImplementation, formURLs, $cookies, formService, Application, $rootScope, $state, $timeout, $uibModal, toastr, $filter, Core, blockUI, connectionConfigURL) {
        const formComponentMap = new Object();
        Application.pages.forEach(page => {
          page.forms.forEach(form => {
            form.rows.forEach(row => {
              row.components.forEach(component => {
                const id = component.formComponentId;
                const sn = component.shortName;
                formComponentMap[sn] = id;
              })
            })
          })
        });

        $rootScope.imageURL = $cookies.get("imagePath") + "/", $scope.page = formService.getPageData($rootScope.pageShortName), console.log("$scope.page", $scope.page), $rootScope.formComponent = {}, Core.changePreLoaderColor(), $rootScope.isLoadingOnFormPage = !1, $rootScope.isFormViewed = !1, $rootScope.isPageFromTask && "0" == $rootScope.stateOfControl && ($rootScope.isFormViewed = !0), $scope.isNavigationFunction = !1, $scope.navigationFunctions = [], $scope.userAndStaticFunctions = [], $scope.formInf = {}, $scope.validCheckboxOrMultiSelect = {}, $rootScope.atLeastValidationValue = "", $scope.formComponentValidation = {
            isInvalid: !1
        }, $rootScope.isFormShowed = !1, $rootScope.compositeBarcode = "", $rootScope.checkboxValues = {}, void 0 !== $rootScope.isFormDataShowed || $rootScope.isFormDataShowed || ($rootScope.formData.userName = $cookies.get("username"), $rootScope.formData.version = Application.version.version, $rootScope.formData.applicationVersionId = Application.applicationId, $rootScope.formData.components = formComponentMap, $rootScope.formData.controlName = Application.name, $rootScope.formData.applicationId = Application.id, $rootScope.formData.controlPoint = "", $rootScope.formData.coordinateX = .11, $rootScope.formData.coordinateY = .11, $rootScope.formData.controlDate = Date.now(), $rootScope.formData.deviceId = "WEB" + Date.now(), $rootScope.formData.appPageShortName = Application.shortName), $rootScope.formData.formno = $rootScope.formData.controlName + (new Date).getTime(), $scope.submit = function(e) {
            if (!$rootScope.isFormViewed) {
                $scope.formComponentValidation.isInvalid = !1, $rootScope.formData.barcode = "";
                for (var t = 0; t < $rootScope.uniqueComponent.length; t++) void 0 !== $rootScope.formData[$rootScope.uniqueComponent[t]] && ("" == $rootScope.formData.barcode ? $rootScope.formData.barcode = $rootScope.formData[$rootScope.uniqueComponent[t]] : void 0 !== $rootScope.formData[$rootScope.uniqueComponent[t]] && ($rootScope.formData.barcode += "_$_" + $rootScope.formData[$rootScope.uniqueComponent[t]]));
                if ("" != $rootScope.formData.barcode && null != $rootScope.formData.barcode && "null" != $rootScope.formData.barcode || ($rootScope.formData.barcode = $rootScope.formData.controlName + (new Date).getTime()), "" != $rootScope.userAssignmentId ? $rootScope.formData.assignmentId = $rootScope.userAssignmentId : $rootScope.formData.assignmentId = -1, e) {
                    var a = {};
                    angular.copy($rootScope.formData, a);
                    i = {}, s = a = formService.objectToString(a);
                    serviceImplementation.service("POST", formURLs.sendFormDataDraftURL, i, s).then((function(e) {
                        toastr.success($filter("translate")("FORM_MESSAGEFORDRAFTEDSUCCESSFULY"), "")
                    }), (function(e) {
                        toastr.error("Upps. Something went wrong.", JSON.stringify(e))
                    }))
                } else {
                    angular.forEach($rootScope.formData, (function(e, t) {
                        /(\d{4})-(\d{2})-(\d{2})/.test(e) && ($rootScope.formData[t] = $filter("date")(e, "dd-MM-yyyy"))
                    }));
                    var o;
                    if (o = formService.checkCustomValidations(), $scope.formInf.mainForm.$valid && o) {
                        var n = {};
                        angular.copy($rootScope.formData, n), delete(n = formService.objectToString(n)).status, delete n.controlName, delete n.appPageShortName, delete n.formno;
                        var i = {},
                            s = n;
                        s.components = JSON.parse(s.components);
                        serviceImplementation.service("POST", formURLs.sendFormDataURL, i, s).then((function(e) {
                            e.status ? (toastr.success($filter("translate")("FORM_MESSAGEFORSAVEDSUCCESSFULY"), ""), $scope.scanResults = [], $scope.formInf.mainForm.$setPristine(), formService.setDefaultFormVariables(), formService.operationsAfterSaveFormData(), localStorage.clear()) : toastr.error($filter("translate")("FORM_ERRORMESSAGEFORSAVED"), "")
                        }), (function(e) {
                            toastr.error($filter("translate")("FORM_ERRORMESSAGEFORSAVED"), "")
                        }))
                    } else $scope.formComponentValidation.isInvalid = !0, $scope.formInf.mainForm.$setSubmitted(!0), toastr.error($filter("translate")("FORM_INVALIDMESSAGEFORSAVED"), "")
                }
            }
        }, $scope.clickEvent = function(functionDetail) {
            var functionName = functionDetail.substring(0, 6);
            "submit" == functionName && (functionDetail = "$scope." + functionDetail), eval(functionDetail)
        }, $scope.setInputValue = function(e, t) {
            void 0 === $rootScope.formData[t] && ($rootScope.formData[t] = e)
        }, $scope.navigate = function(e) {
            var t;
            if (console.log("navigation", e), t = formService.checkCustomValidations(), $scope.formInf.mainForm.$valid && t) {
                $scope.disableTab = !0;
                var a = e.functions.functionDetail,
                    o = a.substring(11, a.lastIndexOf('"'));
                $rootScope.pageShortName = o, $rootScope.pageHistory.push($rootScope.pageShortName), $timeout((function() {
                    $state.reload()
                }), 100), $timeout((function() {
                    document.body.scrollTop = document.documentElement.scrollTop = 0
                }), 500)
            } else $scope.formComponentValidation.isInvalid = !0, $scope.formInf.mainForm.$submitted = !0, toastr.error($filter("translate")("FORM_INVALIDMESSAGEFORSAVED"), "")
        }, $scope.initializeComponentValue = function(e, t) {
            $rootScope.isFormDataShowed || void 0 === $rootScope.formData[e] && ($rootScope.formData[e] = t)
        }, $scope.checkFunctionNavigationType = function(e) {
            var t = !0;
            2 != e.functionType.id ? t = !0 : t = "$state" != (a = e.functionDetail.substring(0, 6));
            if (t) {
                var a, o = (a = e.functionDetail).substring(a.indexOf("(") + 1, a.indexOf(")"));
                $rootScope.isSaveAsDraftFunction = "true" == o
            }
            return t
        }, $scope.openMultipleSelectModal = function(e) {
            $scope.component = e, $rootScope.isFormViewed = !1, $uibModal.open({
                animation: !1,
                scope: $scope,
                templateUrl: "app/pages/report/report-result/multipleSelectModal/multipleSelectModal.html"
            })
        }, $scope.getNumberOfSelectedOption = function(e) {
            var t = 0;
            return angular.forEach(e, (function(e, a) {
                "false" != e && t++
            })), 0 == t ? "Nothing selected" : t + " selected"
        }, $scope.goBack = function() {
            if ($rootScope.isPageFromTask) $state.go("task");
            else {
                for (var e = !1, t = 0; t < $rootScope.userForm.pages.length; t++) $rootScope.userForm.pages[t].homePage && $rootScope.pageShortName == $rootScope.userForm.pages[t].shortName && (e = !0, $state.go("forms"));
                if (!e) {
                    var a;
                    console.log("GO BACK"), a = formService.checkCustomValidations(), $scope.formInf.mainForm.$valid && a ? ($rootScope.pageHistory.pop(), $rootScope.pageShortName = $rootScope.pageHistory[$rootScope.pageHistory.length - 1], $state.reload()) : $scope.formInf.mainForm.$submitted = !0
                }
            }
        }, $scope.openInformationModal = function(e) {
            if (null != e)
                for (var t = 0; t < e.length; t++) $scope.informationModalContent = e[t].key;
            if (formService.hasImageSrc($scope.informationModalContent)) {
                for (var a = [], o = [], n = [], i = "", s = /<img.*?src="([^">]*\/([^">]*?))".*?>/g; a = s.exec($scope.informationModalContent);) n.push(a[1]), o.push(a[2]);
                for (t = 0; t < n.length; t++) i = $cookies.get("imagePath") + "/" + o[t], $scope.informationModalContent = $scope.informationModalContent.replace(n[t], i)
            }
            $uibModal.open({
                animation: !1,
                scope: $scope,
                controller: "informationModalCTRL",
                templateUrl: "app/pages/forms/informationModal/information-modal.html"
            })
        }, $scope.setNavigationFunctions = function(e) {
            $scope.isNavigationFunction = !1, $scope.navigationFunctions = [], $scope.userAndStaticFunctions = [];
            for (var t = 0; t < e; t++) 3 == e[t].functions.functionType ? ($scope.isNavigationFunction = !0, $scope.navigationFunctions.push(e[t])) : ($scope.isNavigationFunction = !1, $scope.userAndStaticFunctions.push(e[t]))
        }, $scope.checkTextTypeNumberValidation = function(e) {
            void 0 !== $rootScope.maxTextNumberValue[e] && ("null" == $rootScope.formData[e] || "" == $rootScope.formData[e] || parseFloat($rootScope.formData[e]) <= parseFloat($rootScope.maxTextNumberValue[e]) ? $rootScope.maxNumberValidation[e] = {
                validation: !0,
                type: $rootScope.componentValidationType[e]
            } : $rootScope.maxNumberValidation[e] = {
                validation: !1,
                type: $rootScope.componentValidationType[e]
            }), void 0 !== $rootScope.minTextNumberValue[e] && ("null" == $rootScope.formData[e] || "" == $rootScope.formData[e] || parseFloat($rootScope.formData[e]) >= parseFloat($rootScope.minTextNumberValue[e]) ? $rootScope.minNumberValidation[e] = {
                validation: !0,
                type: $rootScope.componentValidationType[e]
            } : $rootScope.minNumberValidation[e] = {
                validation: !1,
                type: $rootScope.componentValidationType[e]
            })
        }, $scope.checkMultiOptionsValidation = function(e) {
            if (void 0 !== e) {
                var t = 0;
                angular.forEach($rootScope.formData[e], (function(e, a) {
                    "false" != e && t++
                })), void 0 !== $rootScope.maxCheckNumber[e] && (t <= Number($rootScope.maxCheckNumber[e]) ? $rootScope.maxCheckValidation[e] = !0 : $rootScope.maxCheckValidation[e] = !1), void 0 !== $rootScope.minCheckNumber[e] && (t >= Number($rootScope.minCheckNumber[e]) ? $rootScope.minCheckValidation[e] = !0 : $rootScope.minCheckValidation[e] = !1)
            }
        }, $scope.checkRequiredValidationOfCamera = function(e) {
            void 0 !== $rootScope.formData[e] && $rootScope.formData[e].length > 0 ? $rootScope.isCameraComponentHasValue[e] = !0 : $rootScope.isCameraComponentHasValue[e] = !1
        }, $scope.checkWhetherStringMatches = function(e) {
            void 0 !== $rootScope.matchedString[e] && (void 0 !== $rootScope.formData[e] && $rootScope.formData[e].toUpperCase() == $rootScope.matchedString[e].toUpperCase() ? $rootScope.checkStringMatchesValidation[e] = !0 : $rootScope.checkStringMatchesValidation[e] = !1)
        }, $scope.showCameraRequiredValidation = function(e) {
            return void 0 !== $rootScope.isCameraComponentHasValue[e] && !$rootScope.isCameraComponentHasValue[e]
        }, $scope.showCheckWhetherStringMatchesValidation = function(e) {
            return void 0 !== $rootScope.checkStringMatchesValidation[e] && !$rootScope.checkStringMatchesValidation[e]
        }, $scope.showValidationMessageOfTextBox = function(e) {
            var t, a;
            return t = void 0 !== $rootScope.minNumberValidation[e] && !$rootScope.minNumberValidation[e].validation, a = void 0 !== $rootScope.maxNumberValidation[e] && !$rootScope.maxNumberValidation[e].validation, !(!t && !a)
        }, $scope.showValidationMessageOfMultiOptionComponent = function(e) {
            return (void 0 !== $rootScope.maxCheckValidation[e] || void 0 !== $rootScope.minCheckValidation[e]) && (!$rootScope.maxCheckValidation[e] || !$rootScope.minCheckValidation[e])
        }, $scope.getFormValidations = function(e) {
            return $scope.formInf.mainForm["form" + e]
        }, $scope.onTakePicture = function() {
            $rootScope.isLoadingOnFormPage = !0
        }, $scope.onOpenDetailCameraModal = function(e) {
            $scope.cameraComponent = e, $scope.cameraImageURL = $rootScope.imageURL, $uibModal.open({
                backdrop: "static",
                keyboard: !1,
                animation: !1,
                controller: "detailCameraModalCTRL",
                scope: $scope,
                templateUrl: "app/pages/forms/detailCameraModal/detailCameraModal.html"
            })
        }, $scope.initfillIlce = function(e, t) {
            $rootScope.formData[e] && "" != $rootScope.formData[e] && serviceImplementation.serviceWithoutToken("GET", connectionConfigURL + "/mfc/custom/getCountiesByCode/" + $rootScope.formData[e], {}, {}, "custom").then((function(e) {
                for (var a = [], o = [], n = 0; n < t.length; n++) document.getElementsByName("name" + t[n])[0].closest(".row").style.display = "flex";
                for (n = e.length; n < t.length; n++) document.getElementsByName("name" + t[n])[0].closest(".row").style.display = "none";
                for (var i = 0; i < e.length; i++) a.push({
                    type: "Option",
                    key: e[i].key,
                    name: e[i].value
                });
                angular.forEach($scope.page.forms, (function(e) {
                    angular.forEach(e.rows, (function(e) {
                        angular.forEach(e.components, (function(e) {
                            t.includes(e.shortName) && (o = [], angular.forEach(e.options, (function(e) {
                                "Option" != e.type && o.push(e)
                            })), e.options = o.concat(a))
                        }))
                    }))
                }))
            }), (function(e) {
                toastr.error("Ups! Something goes wrong please try again later!", "")
            }))
        }, $scope.fillIlce = function(e, t) {
            $rootScope.formData[e] && "" != $rootScope.formData[e] && serviceImplementation.serviceWithoutToken("GET", connectionConfigURL + "/mfc/custom/getCountiesByCode/" + $rootScope.formData[e], {}, {}, "custom").then((function(e) {
                for (var a = [], o = [], n = 0; n < t.length; n++) document.getElementsByName("name" + t[n])[0].closest(".row").style.display = "flex";
                for (n = e.length; n < t.length; n++) document.getElementsByName("name" + t[n])[0].closest(".row").style.display = "none";
                for (var i = 0; i < e.length; i++) a.push({
                    type: "Option",
                    key: e[i].key,
                    name: e[i].value
                });
                angular.forEach($scope.page.forms, (function(e) {
                    angular.forEach(e.rows, (function(e) {
                        angular.forEach(e.components, (function(e) {
                            t.includes(e.shortName) && (o = [], angular.forEach(e.options, (function(e) {
                                "Option" != e.type && o.push(e)
                            })), e.options = o.concat(a), console.log("component.options.length", e.options.length), $rootScope.formData[e.shortName] = "")
                        }))
                    }))
                }))
            }), (function(e) {
                toastr.error("Ups! Something goes wrong please try again later!", "")
            }))
        }, $scope.$on("$viewContentLoaded", (function() {
            console.log("viewContentLoaded !?"), blockUI.start(), setTimeout((function() {
                blockUI.stop()
            }), 15e3);
            var datasourceMap = [],
                isDatasourceExist = !1;
            angular.forEach($scope.page.forms, (function(e) {
                angular.forEach(e.rows, (function(e) {
                    angular.forEach(e.components, (function(e) {
                        e.datasourceType && angular.forEach(e.options, (function(t) {
                            if ("Datasource" == t.type) {
                                var a = datasourceMap[t.value];
                                a ? a.push(e) : datasourceMap[t.value] = [e], isDatasourceExist = !0
                            }
                        }))
                    }))
                }))
            })), isDatasourceExist || blockUI.stop();
            var keys = Object.keys(datasourceMap),
                promise_array = [];
            angular.forEach(keys, (function(e) {
                var t = datasourceMap[e],
                    a = serviceImplementation.serviceWithoutToken("GET", e, {}, {}, "custom").then((function(e) {
                        for (var a = [], o = 0; o < e.length; o++) a.push({
                            type: "Option",
                            key: e[o].key,
                            name: e[o].value
                        });
                        for (var n = 0; n < t.length; n++) t[n].options = t[n].options.concat(a)
                    }), (function(e) {
                        toastr.error("Ups! Something goes wrong please try again later!", "")
                    }));
                promise_array.push(a)
            })), $q.all(promise_array).then((function() {
                blockUI.stop(), setTimeout((function() {
                    angular.forEach($scope.page.forms, (function(form) {
                        angular.forEach(form.rows, (function(row) {
                            angular.forEach(row.components, (function(component) {
                                component.datasourceType && angular.forEach(component.events, (function(event) {
                                    angular.forEach(event.functions, (function(functionTmp) {
                                        var startString = functionTmp.functionDetail.substring(0, 6);
                                        "fillIl" === startString && eval("$scope.init" + functionTmp.functionDetail)
                                    }))
                                }))
                            }))
                        }))
                    }))
                }), 2e3)
            }))
        }))
    }
    formCTRL.$inject = ["$scope", "$q", "serviceImplementation", "formURLs", "$cookies", "formService", "Application", "$rootScope", "$state", "$timeout", "$uibModal", "toastr", "$filter", "Core", "blockUI", "connectionConfigURL"], angular.module("BlurAdmin.pages.forms").controller("formCTRL", formCTRL)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        return {
            getPageData: function(t) {
                var o = {};
                e.pageShortName = t;
                for (var n = 0; n < a.pages.length; n++) {
                    t == a.pages[n].shortName && (o = a.pages[n])
                }
                return o
            },
            objectToString: function(e) {
                for (var t in e)(angular.isArray(e[t]) || angular.isObject(e[t])) && (e[t] = angular.toJson(e[t]));
                return e
            },
            setDefaultFormVariables: function() {
                e.formData = {}, e.uniqueComponent = [], e.userAssignmentId = "", e.maxCheckNumber = {}, e.minCheckNumber = {}, e.maxCheckValidation = {}, e.minCheckValidation = {}, e.isCheckComponentValid = {}, e.maxTextNumberValue = {}, e.minTextNumberValue = {}, e.maxNumberValidation = {}, e.minNumberValidation = {}, e.isTextTypeNumberComponentValid = {}, e.checkStringMatchesValidation = {}, e.matchedString = {}, e.isCameraComponentHasValue = {}, e.componentValidationType = {}, e.requiredValidation = {}
            },
            operationsAfterSaveFormData: function() {
                t.go("forms")
            },
            hasImageSrc: function(e) {
                return -1 != e.indexOf("img")
            },
            checkTextNumberValidation: function() {
                console.log("checkTextNumberValidation begins");
                var t = !0,
                    a = !0;
                return angular.forEach(e.maxNumberValidation, (function(t, o) {
                    t.validation || t.type != e.validationType.VALIDATION || (a = !1)
                })), angular.forEach(e.minNumberValidation, (function(a, o) {
                    a.validation || a.type != e.validationType.VALIDATION || (t = !1)
                })), t && a
            },
            checkStringMatchValidation: function() {
                var t = !0;
                return angular.forEach(e.checkStringMatchesValidation, (function(e, a) {
                    e || (t = !1)
                })), t
            },
            checkRequiredValidationForCamera: function() {
                var t = !0;
                return angular.forEach(e.isCameraComponentHasValue, (function(e, a) {
                    e || (t = !1)
                })), t
            },
            checkMultiOptionComponentsValidation: function() {
                var t = !0,
                    a = !0;
                return angular.forEach(e.maxCheckValidation, (function(e, a) {
                    e || (t = !1)
                })), angular.forEach(e.minCheckValidation, (function(e, t) {
                    e || (a = !1)
                })), t && a
            },
            checkCustomValidations: function() {
                return this.checkTextNumberValidation() && this.checkMultiOptionComponentsValidation() && this.checkStringMatchValidation() && this.checkRequiredValidationForCamera()
            }
        }
    }
    e.$inject = ["$rootScope", "$state", "Application"], angular.module("BlurAdmin.pages.forms").factory("formService", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        a.logout()
    }
    e.$inject = ["$window", "Core", "LoginService"], angular.module("BlurAdmin.pages.logout").controller("LogOutCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d, p, m) {
        n.changePreLoaderColor(), e.hoveringAppName = !1, t.nextStateIsPalette = !1, t.showAppInformation = !1, e.applicationName = "", e.isDisabled = !0, e.radioValue = "", t.isNotCreated = !1, e.isSearchFilterExist = !1, e.isUpdateButtonShowed = {
            update: !0,
            save: !1
        }, t.isStatusSet ? e.isLoading = !1 : e.isLoading = !0, e.isSortDownClicked = !0, e.isSortUpClicked = !1, e.orderKeyword = "DESC", e.sort = function(t) {
            e.orderKeyword = t, console.log("$scope.orderKeyword: " + e.orderKeyword), e.search(), "ASC" == t ? (e.isSortDownClicked = !1, e.isSortUpClicked = !0) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1)
        }, e.maxSize = 5, e.bigTotalItems = "", e.itemPerPage = 5, e.bigCurrentPage = 1, e.isTableSearched = !1;
        var u = {};
        e.getAppNames = function() {
            var a;
            1 == e.bigCurrentPage ? u.offset = 0 : u.offset = (e.bigCurrentPage - 1) * e.itemPerPage, u.order = e.orderKeyword, u.limit = e.itemPerPage, e.isTableSearched || (u.filterRequest = [], u.filterRequest.push({
                fieldName: "status",
                value: 0
            })), a = u, console.log("getAppNames parameter:", a), o.service("POST", s.getApplicationNames, {}, a).then((function(a) {
                e.isLoading = !1, e.bigTotalItems = a.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.itemPerPage), t.applications = a.objList
            }), (function(e) {
                r.error(d("translate")("APPLICATIONPAGE_APPGETERROR"), "")
            }))
        }, e.getAppNames(), e.search = function() {
            e.isTableSearched = !0, e.isSearchFilterExist = !1, (u = {}).filterRequest = [], "" != e.applicationName && void 0 !== e.applicationName && e.applicationName.length > 2 && (u.filterRequest.push({
                fieldName: "name",
                value: e.applicationName
            }), e.isSearchFilterExist = !0), e.bigCurrentPage = 1, u.filterRequest.push({
                fieldName: "status",
                value: 0
            }), e.getAppNames()
        }, o.service("GET", s.getAllComponentsURL, {}).then((function(e) {
            t.allComponents = e
        })), o.service("GET", s.getAllOptionsTypeURL, {}).then((function(e) {
            t.allOptionTypes = e
        })), o.service("GET", s.getAllEventTypeURL, {}).then((function(e) {
            t.allEventTypes = e
        })), o.service("GET", s.getAllValidationTypeURL, {}).then((function(e) {
            t.allValidationTypes = e
        })), o.service("GET", s.getAllFunctionTypeURL, {}).then((function(e) {
            t.functionTypes = e
        })), o.service("GET", s.getInputTypes, {}).then((function(e) {
            t.inputTypes = e
        })), e.addNewApp = function() {
            a.open({
                animation: !1,
                controller: "NewApplicationModalCtrl",
                scope: e,
                templateUrl: "app/pages/palette/newApplicationModal/newApplicationModal.html"
            })
        }, e.onSelectedApp = function(a, o) {
            t.isApplicationCreated = !1, e.isLoading = !0, e.openSelectedApp(a, o)
        }, e.openSelectedApp = function(a, n) {
            console.log("OpenSelectedApp method started"), t.nextStateIsPalette = !0, t.currentPageIndex = "", t.allEndpoints = [], t.applicationIndex = a;
            var l = {},
                c = n;
            o.service("POST", s.getAllFunctionsURL, l, c).then((function(e) {
                t.allFunctions = e
            })), t.datasourceOptions = [{
                value: !1,
                name: "DB"
            }, {
                value: !0,
                name: "SOAP/REST"
            }];
            c = {}, l = {};
            var m = {
                filterRequest: [],
                order: "ASC",
                limit: 5
            };
            m.filterRequest.push({
                fieldName: "status",
                value: "0"
            }), m.offset = 0, c = m, o.service("POST", i.getAllDatasource, l, c).then((function(e) {
                t.allEndpoints = e.objList
            }));
            l = {};
            (c = {}).applicationId = Number(n), o.service("POST", s.getStructureURL, l, c).then((function(a) {
                if (a.length > 0) {
                    if (t.currentApp = a[0], null == t.currentApp.pages || t.currentApp.pages == []) {
                        t.currentApp.pages = [];
                        var o = p.createNewPage("Screen1");
                        t.currentApp.pages.push(o), console.log("After adding  new created app's default page information is:", t.currentApp), e.isLoading = !1
                    }
                    p.sortApplicationPagesByPageNumber(), console.log("Current app before open the selected app", t.currentApp), e.isLoading = !1, t.currentTpl = "app/pages/palette/palette.html"
                } else r.error(d("translate")("OPENAPP_ERROR"), "")
            }))
        }, e.setAppInformation = function(a, n) {
            e.isLoading = !0, t.indexOfSelectedApp = n, e.isUpdateButtonShowed = {
                update: !0,
                save: !1
            };
            var i = {};
            i.applicationId = Number(a), o.service("POST", s.getStructureURL, {}, i).then((function(a) {
                t.currentApp = a[0], console.log("Current app shortName:", t.currentApp.shortName), e.radioValue = t.currentApp.formType, t.showAppInformation = !0, e.isLoading = !1
            }))
        }, e.deleteApp = function() {
            t.deleteOperation = "app";
            var a = d("translate")("CONFIRMDELETE_MESSAGE"),
                o = {
                    animation: !1,
                    controller: "ConfirmDeleteModalCtrl",
                    scope: e,
                    templateUrl: "app/modal/confirmDeleteModal.html"
                };
            n.openConfirmModal(o, a)
        }, e.updateApp = function() {
            e.isDisabled = !1, e.isUpdateButtonShowed.update = !1, e.isUpdateButtonShowed.save = !0
        }, e.clearChangeOfApp = function() {
            e.isDisabled = !0, e.isUpdateButtonShowed.update = !0, e.isUpdateButtonShowed.save = !1, t.currentApp.formType = e.radioValue
        }, e.saveApp = function() {
            e.isLoading = !0, e.isDisabled = !0, e.isUpdateButtonShowed.update = !0, e.isUpdateButtonShowed.save = !1, t.showAppInformation = !0;
            var a = {};
            a.data = t.currentApp, a.userName = l.get("username"), o.service("POST", s.newApplicationURL, {}, a).then((function(a) {
                e.isLoading = !1, r.success(d("translate")("NEWAPPMODAL_APPSUCCESS"), ""), console.log("After updated", a), t.currentApp = a;
                var n = p.createNewPage("Screen1");
                t.currentApp.pages.push(n);
                var i = {};
                i.data = t.currentApp, i.userName = l.get("username"), o.service("POST", s.saveStructureURL, {}, i).then((function(e) {}))
            }), (function() {
                r.error(d("translate")("NEWAPPMODAL_APPFAIL"), "")
            }))
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModal", "serviceImplementation", "Core", "dataSourceURLs", "paletteURL", "toastr", "$cookies", "$timeout", "$filter", "paletteService", "ReportServiceURLs"], angular.module("BlurAdmin.pages.form-management").controller("applicationCTRL", e)
}(),
function() {
    "use strict";

    function e(e) {
        e.isEditorSaved = !0, e.currentTpl = "app/pages/palette/application.html"
    }
    e.$inject = ["$rootScope"], angular.module("BlurAdmin.pages.form-management").controller("indexPaletteCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d) {
        console.log("Selected current app:", t.currentApp), e.properties = {}, e.entity = {}, e.isHomePageSelectedBefore = {}, e.selectedForm = {}, e.alignColumn = {};
        var p = "";
        t.uniqueCount = 0, t.isEditorSaved = !0, e.isNavigationTabAdded = !1, e.isOptionSectionOpened = !0, t.isEventForNavigation = !1, e.isComponentClicked = !1, e.isLoading = !1;
        var m = "",
            u = "",
            g = "",
            E = "";
        "" != typeof t.currentPageIndex ? e.selectedIndex = t.currentPageIndex : e.selectedIndex = 0, e.isComponentClicked = !1, e.componentOptions = {}, e.inputOptions = {}, e.componentValidations = {}, e.optionsOfValidation = {}, t.componentEvents = {}, t.optionsOfEvent = {}, t.navigationTab = {}, e.selectBoxValue = {}, e.selectedFormIndex = "", e.selectedRowIndex = "", e.selectedColumnIndex = "", e.selectedPageIndex = "", e.isFormSelected = !1, e.isRowSelected = !1, e.isColumnSelected = !1, e.isComponentSelected = !1, e.componentSelected = {}, e.ctrlDown = !1, e.ctrlKey = 17, e.vKey = 86, e.cKey = 67, e.dKey = 46;
        var T = n("translate")("CONFIRMDELETE_MESSAGE");
        e.componentDataSourceVariable = {};
        var f = {
            animation: !1,
            controller: "ConfirmDeleteModalCtrl",
            scope: e,
            templateUrl: "app/modal/confirmDeleteModal.html"
        };
        e.propertiesUrl = {
            Button: "/buttonProperties.html",
            TextBox: "/inputProperties.html",
            Text: "/textProperties.html",
            TextArea: "/textAreaProperties.html",
            CheckBox: "/checkboxProperties.html",
            RadioButton: "/radioButtonProperties.html",
            SelectBox: "/selectBoxProperties.html",
            MultiSelectBox: "/multiSelectBoxProperties.html",
            BarcodeReader: "/barcodeProperties.html",
            tab: "/tabProperties.html",
            page: "/pageProperties.html",
            Camera: "/cameraProperties.html",
            DetailCamera: "/cameraProperties.html",
            Info: "/infoProperties.html",
            Signature: "/signatureProperties.html",
            Image: "/image.html"
        }, e.goBackAppList = function() {
            t.currentTpl = "app/pages/palette/application.html", t.isEditorSaved || a.open({
                animation: !1,
                backdrop: "static",
                keyboard: !1,
                controller: "ConfirmBeforeClosingTheEditorCTRL",
                templateUrl: "app/pages/palette/confirmModal/confirmBeforeClosingTheEditor.html"
            })
        }, e.setCurrentPage = function(t) {
            e.currentPage = t
        }, e.setPageProperties = function(t, a) {
            e.properties.template = t, e.selectedPageIndex = a, e.isComponentClicked = !0, e.entity.name = "Page", e.isFormSelected = !1, e.isRowSelected = !1, e.isColumnSelected = !1, e.isComponentSelected = !1
        }, e.setSelectedForm = function(t, a, o) {
            o.stopPropagation(), e.properties.template = "/formProperties.html", e.selectedForm.properties = t, e.selectedFormIndex = a, e.isFormSelected = !0, e.isRowSelected = !1, e.isColumnSelected = !1, e.isComponentSelected = !1, e.entity.name = "Form", e.isComponentClicked = !0
        }, e.setRowProperties = function(t, a) {
            e.selectedFormIndex = t, e.selectedRowIndex = a, e.isColumnSelected = !1, e.isFormSelected = !1, e.isRowSelected = !0, e.isComponentSelected = !1, e.properties.template = "", e.entity.name = "", e.isComponentClicked = !1
        }, e.setColumn = function(t, a, o, n) {
            e.properties.template = "/columnProperties.html", e.componentOptions.component = n, e.selectedFormIndex = t, e.selectedRowIndex = a, e.selectedColumnIndex = o, e.isColumnSelected = !0, e.isFormSelected = !1, e.isRowSelected = !1, e.isComponentSelected = !1, e.isComponentClicked = !0, e.entity.name = "Column"
        }, e.setSelectedComponentProperties = function(a, o) {
            a.stopPropagation(), e.isComponentClicked = !0;
            var n = a.currentTarget.parentElement.id.split("#");
            e.selectedFormIndex = n[0], e.selectedRowIndex = n[1], e.selectedColumnIndex = n[2], e.componentOptions.component = o, t.componentEvents.events = o.events, e.componentValidations = o.validations, e.entity.name = o.type, "Video" == o.type ? e.properties.template = e.propertiesUrl.Camera : e.properties.template = e.propertiesUrl[o.type], e.isColumnSelected = !1, e.isFormSelected = !1, e.isRowSelected = !1, e.isComponentSelected = !0, e.componentSelected[o.shortName] = !0, angular.forEach(e.componentSelected, (function(t, a) {
                a != o.shortName && (e.componentSelected[a] = !1)
            }))
        }, e.setTabProperties = function(t, a) {
            t.stopPropagation(), e.properties.template = a, e.isColumnSelected = !1, e.isFormSelected = !1, e.isRowSelected = !1, e.isComponentSelected = !1, e.isComponentClicked = !0, e.entity.name = "Navigation"
        }, e.setHomePage = function(a) {
            if (e.currentPage.homePage)
                for (var o = 0; o < t.currentApp.pages.length; o++) {
                    t.currentApp.pages[o].shortName != a && (t.currentApp.pages[o].homePage = !1)
                }
        }, e.addNewPage = function() {
            e.selectedIndex = e.selectedIndex - 1, a.open({
                animation: !1,
                controller: "NewPageModalCtrl",
                scope: e,
                templateUrl: "app/pages/palette/newPageModal/newPageModal.html"
            })
        }, e.addColumn = function(a, o) {
            t.isEditorSaved = !1;
            var n = e.currentPage.forms[a].rows[o].components.length,
                i = o,
                s = d.createNewComponent(n, i);
            e.currentPage.forms[a].rows[o].components.push(s)
        }, e.addValidation = function(t, o) {
            e.selectedValidationType = o, e.componentShortName = t.component.shortName, e.componentValidations = t.component, e.componentType = t.component.type, a.open({
                animation: !1,
                controller: "AddValidationCtrl",
                scope: e,
                templateUrl: "app/pages/palette/validationModal/addValidationModal.html"
            })
        }, e.addEvents = function(a) {
            t.componentShortName = a.component.shortName, t.componentEvents = a.component, t.isEventForNavigation = !1, t.currentPageIndex = e.selectedIndex, t.currentTpl = "app/pages/palette/add-event/add-event.html"
        }, e.addNewTab = function() {
            t.isEditorSaved = !1;
            var a, o = e.currentPage.navigations.length;
            a = d.createNewTab(o), e.currentPage.navigations.push(a)
        }, e.addNewOption = function(e) {
            t.isEditorSaved = !1;
            var a, o = e.component.options.length;
            a = d.createNewOption(o), e.component.options.push(a)
        }, e.addFunction = function(a) {
            t.navigationTab = a, t.isEventForNavigation = !0, t.currentPageIndex = e.selectedIndex, t.currentTpl = "app/pages/palette/add-event/add-event.html"
        }, e.addRow = function(t, a) {
            console.log("Form:" + t + " Row:" + a);
            var o = e.currentPage.forms[t].rows.length,
                n = d.createNewRow(o);
            e.currentPage.forms[t].rows.splice(a + 1, 0, n)
        }, e.openMultipleSelectModal = function(t) {
            e.component = t, a.open({
                animation: !1,
                scope: e,
                templateUrl: "app/pages/palette/multipleSelectModal/multipleSelectModal.html"
            })
        }, e.controlTextComponent = function(e, t) {
            return "" == e[t].key || void 0 === e[t].key
        }, e.setComponentOptions = function(e) {
            for (var t = !1, a = !1, o = 0; o < e.component.options.length; o++) e.component.options[o].key = e[e.component.shortName][e.component.options[o].name], "readonly" == e.component.options[o].name && (t = !0), "alias" == e.component.options[o].name && (a = !0);
            t || "TextBox" == e.component.options[0].type && e.component.options.push({
                name: "readonly",
                key: e[e.component.shortName].readonly,
                orderNumber: "5",
                value: "",
                id: "",
                optionTypeId: e.component.options[0].optionTypeId,
                type: "TextBox"
            }), a || ["TextBox", "TextArea", "CheckBox", "RadioButton", "SelectBox", "BarcodeReader", "MultiSelectBox"].includes(e.component.type) && e.component.options.push({
                name: "alias",
                key: e[e.component.shortName].alias,
                orderNumber: "2",
                value: "",
                id: "",
                optionTypeId: e.component.options[0].optionTypeId,
                type: "TextBox"
            })
        }, e.setTextStyle = function(e) {
            for (var t = !1, a = !1, o = 0; o < e.component.options.length; o++) "bold" == e.component.options[o].name && (t = !0), "font-size" == e.component.options[o].name && (a = !0);
            t || e.component.options.push({
                name: "bold",
                key: "",
                orderNumber: "1",
                value: "",
                id: "",
                optionTypeId: e.component.options[0].optionTypeId,
                type: "Text"
            }), a || e.component.options.push({
                name: "font-size",
                key: 14,
                orderNumber: "2",
                value: "",
                id: "",
                optionTypeId: e.component.options[0].optionTypeId,
                type: "Text"
            });
            for (o = 1; o < e.component.options.length; o++) e.component.options[o].key = e[e.component.shortName][e.component.options[o].name]
        }, e.setTextSizeStyle = function(e) {
            return {
                "font-size": e
            }
        }, e.setTextComponentOptions = function(e) {
            e.component.options[0].key = e[e.component.shortName].key, e.component.options[0].name = e[e.component.shortName].name
        }, e.initializeTextComponentOptions = function(e, t) {
            for (var a = !1, o = !1, n = 0; n < e.options.length; n++) n > 0 && "font-size" != e.options[n].name && (t[e.shortName][e.options[n].name] = e.options[n].key), "font-size" == e.options[n].name && (a = !0, t[e.shortName][e.options[n].name] = Number(e.options[n].key)), "bold" == e.options[n].name && (o = !0);
            o || (e.options.splice(1, 0, {
                name: "bold",
                key: "false",
                orderNumber: "1",
                value: "",
                id: "",
                optionTypeId: e.options[0].optionTypeId,
                type: "Text"
            }), t[e.shortName][e.options[1].name] = Number(e.options[n].key)), a || (e.options.splice(2, 0, {
                name: "font-size",
                key: 14,
                orderNumber: "2",
                value: "",
                id: "",
                optionTypeId: e.options[0].optionTypeId,
                type: "Text"
            }), t[e.shortName][e.options[2].name] = Number(e.options[n].key))
        }, e.setTextEditor = function(e) {
            return "label" == e
        }, e.setUniqueCount = function(e) {
            "true" == e.key && t.uniqueCount++
        }, e.changeUniqueCount = function(e) {
            t.isEditorSaved = !1, "true" == e[e.component.shortName].isUnique ? t.uniqueCount++ : t.uniqueCount--
        }, e.setOptionSectionShow = function(t) {
            e.isOptionSectionOpened = !!t
        }, e.setValueProperties = function(e) {
            "false" == e.key.toLowerCase() ? (l.error(n("translate")("OPTION_ERROR_VALUE"), ""), e.key = "", e.name = "") : e.name = e.key
        }, e.validateValue = function(e) {
            "false" == e.name.toLowerCase() && (l.error(n("translate")("OPTION_ERROR_VALUE"), ""), e.name = "")
        }, e.setComponentDataSource = function(t, a) {
            e.componentDataSourceOption = t, e.selectedDataSourceType = a;
            var o = n("translate")("DATASOURCE_MODAL_MESSAGE"),
                s = {
                    animation: !1,
                    controller: "confirmForDataSourceModalCTRL",
                    scope: e,
                    templateUrl: "app/modal/confirmDeleteModal.html"
                };
            i.openConfirmModal(s, o)
        }, e.deletePage = function() {
            t.deleteOperation = "page", e.appPageLength = t.currentApp.pages.length, t.modalMessage = T, a.open({
                animation: !1,
                controller: "ConfirmDeleteModalCtrl",
                scope: e,
                templateUrl: "app/modal/confirmDeleteModal.html"
            }).closed.then((function() {
                e.appPageLength == t.currentApp.pages.length && e.selectedIndex++
            })), e.selectedIndex = e.selectedIndex - 1
        }, e.deleteForm = function() {
            t.deleteOperation = "form", i.openConfirmModal(f, T)
        }, e.deleteRow = function(a, o) {
            t.deleteOperation = "row", e.selectedFormIndex = a, e.selectedRowIndex = o, i.openConfirmModal(f, T)
        }, e.deleteColumn = function() {
            t.deleteOperation = "column", i.openConfirmModal(f, T)
        }, e.deleteSelectedColumn = function(a, o) {
            t.deleteOperation = "column", e.selectedFormIndex = a, e.selectedRowIndex = o, e.selectedColumnIndex = e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components.length - 1, i.openConfirmModal(f, T)
        }, e.deleteComponent = function(e) {
            t.deleteOperation = "component", i.openConfirmModal(f, T)
        }, e.deleteNavigationTabItem = function(a) {
            t.deleteOperation = "tabItem", e.deletedTabIndex = a, i.openConfirmModal(f, T)
        }, e.deleteNavigationTab = function() {
            t.deleteOperation = "navigationTab", i.openConfirmModal(f, T)
        }, e.deleteOptionTab = function(a) {
            e.deletedOptionIndex = a, t.deleteOperation = "optionTab", i.openConfirmModal(f, T)
        }, e.openInfoEditor = function(a) {
            t.componentOption = a, t.currentPageIndex = e.selectedIndex, t.currentTpl = "app/pages/palette/add-content-to-info-component/add-content-to-info-component.html"
        }, e.setDisabled = function(e) {
            return "date" == e || "month" == e
        }, e.saveApplication = function() {
            e.isLoading = !0;
            for (var a = [], i = {}, c = !1, p = !0, m = 0; m < t.currentApp.pages.length; m++) {
                t.currentApp.pages[m].pageNumber && !0, t.currentApp.pages[m].homePage && (c = !0);
                for (var u = 0; u < t.currentApp.pages[m].navigations.length; u++) angular.equals(t.currentApp.pages[m].navigations[u].functions, {}) && (p = !1);
                for (var g = 0; g < t.currentApp.pages[m].forms.length; g++) {
                    var E = 0;
                    if (0 == t.currentApp.pages[m].forms[g].rows.length) t.currentApp.pages[m].forms.splice(g, 1);
                    else
                        for (var T = 0; T < t.currentApp.pages[m].forms[g].rows.length; T++) {
                            for (var f = 0; f < t.currentApp.pages[m].forms[g].rows[T].components.length; f++) {
                                var A = t.currentApp.pages[m].forms[g].rows[T].components[f];
                                t.currentApp.pages[m].forms[g].rows[T].components[f].rowNumber = E, "Info" == A.shortName.substring(0, 4) && (a = d.getInfoComponentImages(A.options))
                            }
                            E++
                        }
                }
            }
            d.sendInfoComponentImages(a, t.currentApp.id, o.get("username")), console.log("After added", t.currentApp), c && p ? (i.data = t.currentApp, i.userName = o.get("username"), s.service("POST", r.saveStructureURL, {}, i).then((function(a) {
                l.success(n("translate")("PALETTE_SAVESUCCESSMESSAGE"), ""), e.isLoading = !1, t.isEditorSaved = !0
            }), (function() {
                t.isStatusSet || (l.error(n("translate")("PALETTE_SAVEERRORMESSAGE"), ""), e.isLoading = !1, t.isEditorSaved = !1)
            }))) : (c || l.error(n("translate")("PALETTE_MUSTPICKHOMEPAGE"), ""), p || l.error(n("translate")("PALETTE_MUSTADDNAVIGATIONFUNCTION"), ""))
        }, e.openTextContentEditor = function(a) {
            t.componentOption = a, t.currentPageIndex = e.selectedIndex, t.currentTpl = "", t.currentTpl = "app/pages/palette/add-text-content/add-text-content.html"
        }, window.onbeforeunload = function() {
            if (!t.isEditorSaved) return n("translate")("PALETTE_BEFORERELOAD_ERRORMESSAGE")
        }, e.keyDownForm = function(t, a) {
            e.ctrlDown && t.keyCode == e.cKey ? (g = "", m = "", E = "form", e.displayCopyInformation(), u = angular.copy(a), console.log("Copied Form:", u)) : t.keyCode == e.dKey && (t.stopPropagation(), e.deleteForm())
        }, e.pasteForm = function(a, o) {
            u.shortName = d.getShortName("Form"), t.isEditorSaved = !1;
            for (var n = 0; n < u.rows.length; n++)
                for (var i = 0; i < u.rows[n].components.length; i++) {
                    var s = u.rows[n].components[i];
                    s.shortName = d.getShortName(s.type)
                }
            var r = {};
            angular.copy(u, r), e.ctrlDown && a.keyCode == e.vKey && "form" == E && e.currentPage.forms.splice(o, 0, r)
        }, e.keyDownRow = function(t, a) {
            if (e.ctrlDown && t.keyCode == e.cKey) t.stopPropagation(), u = "", g = "", E = "row", m = angular.copy(a), e.displayCopyInformation(), console.log("Copied Row:", m);
            else if (t.keyCode == e.dKey) {
                t.stopPropagation();
                var o = t.currentTarget.id.split("#");
                e.deleteRow(o[0], o[1])
            }
        }, e.pasteRow = function(a, o, n) {
            if (e.ctrlDown && a.keyCode == e.vKey && "row" == E) {
                a.stopPropagation(), t.isEditorSaved = !1, console.log("CopiedRow:", m);
                for (var i = 0; i < m.components.length; i++)
                    if (m.components[i].shortName = d.getShortName(m.components[i].type), console.log("Component options:", m.components[i].options), e.componentOptions[m.components[i].shortName] = {}, "Text" == m.components[i].type)
                        for (var s = 0; s < m.components[i].options.length; s++) "label" == m.components[i].options[s].name && (e.componentOptions[m.components[i].shortName].key = m.components[i].options[s].key);
                var r = {};
                angular.copy(m, r), console.log("New row:", r), void 0 === n ? (n = e.currentPage.forms[o].rows.length, e.currentPage.forms[o].rows.splice(n, 0, r)) : e.currentPage.forms[o].rows.splice(n, 0, r)
            }
        }, e.keyDownColumn = function(a, o) {
            var n = a.target.id.split("#");
            if (e.ctrlDown && a.keyCode == e.cKey) a.stopPropagation(), m = "", u = "", e.displayCopyInformation(), E = "column", g = angular.copy(o), console.log("Copied Column:", g);
            else if (e.ctrlDown && a.keyCode == e.vKey && "column" == E) {
                t.isEditorSaved = !1;
                var i = {};
                g.shortName = d.getShortName(g.type), angular.copy(g, i), e.currentPage.forms[n[0]].rows[n[1]].components[n[2]] = i
            } else a.keyCode == e.dKey && (a.stopPropagation(), e.deleteColumn())
        }, e.keyDownComponent = function(t, a) {
            if (t.keyCode == e.dKey) {
                t.stopPropagation();
                var o = t.currentTarget.parentElement.id.split("#");
                e.selectedFormIndex = o[0], e.selectedRowIndex = o[1], e.selectedColumnIndex = o[2], e.deleteComponent()
            } else !e.ctrlDown || t.keyCode != e.vKey && t.keyCode != e.cKey || (t.stopPropagation(), e.keyDownColumn(t, a))
        }, angular.element(c).bind("keyup", (function(t) {
            t.keyCode == e.ctrlKey && (e.ctrlDown = !1), e.$apply()
        })), angular.element(c).bind("keydown", (function(t) {
            t.keyCode == e.ctrlKey && (e.ctrlDown = !0), e.$apply()
        })), e.displayCopyInformation = function() {
            l.info(n("translate")("COPIED_INFO"), "", {
                timeOut: 300,
                maxOpened: 1
            })
        }, e.componentLeaveStyle = function(e) {
            e.target.style.height = "", e.target.style.backgroundColor = ""
        }, e.controlIsEmptyComponent = function(t, a, o) {
            return console.log("Form index:" + t + ".Row index:" + a + ".Column index:" + o), "" != t && void 0 !== t && "" != a && void 0 !== a && "" != o && void 0 !== o && "EmptyComponent" == e.currentPage.forms[t].rows[a].components[o].type
        }, e.controlIsEmptyComponent = function(t, a, o) {
            return "" != t && void 0 !== t && "" != a && void 0 !== a && "" != o && void 0 !== o && "EmptyComponent" == e.currentPage.forms[t].rows[a].components[o].type
        }, e.controlRowHasComponent = function(t, a) {
            for (var o = !1, n = 0; n < e.currentPage.forms[t].rows[a].components.length; n++) e.controlIsEmptyComponent(t, a, n.toString()) || (o = !0);
            return o
        }, e.controlIsEmptyForm = function(t) {
            return 0 == e.currentPage.forms[t].rows.length
        }, e.dragOver = function(e) {
            e.preventDefault()
        }, e.dragOverForm = function(t) {
            t.preventDefault();
            var a = t.target.id.split("#");
            "grid" == p && "" != a[0] && e.controlIsEmptyForm(a[0]) && (t.target.style.backgroundColor = "rgba(0, 0, 0, 0.08)")
        }, e.dragOverBreakForms = function(e) {
            e.preventDefault();
            var t = p.split("#");
            ("form" == p || "tab" == p || t.length > 1 && "form" == t[1]) && (document.getElementById(e.target.id).style.height = "60px", e.target.style.backgroundColor = "rgba(0, 0, 0, 0.08)")
        }, e.dragOverBreakRows = function(e) {
            e.preventDefault();
            var t = p.split("#");
            ("grid" == p || t.length > 1 && "row" == t[2]) && (document.getElementById(e.target.id).style.height = "60px", e.target.style.backgroundColor = "rgba(0, 0, 0, 0.08)")
        }, e.dragOverColumn = function(t) {
            t.preventDefault();
            var a = t.target.id.split("#");
            if ("grid" != p && "form" != p && "tab" != p) {
                var o = e.controlIsEmptyComponent(a[0], a[1], a[2]);
                o && (t.target.style.backgroundColor = "rgba(0, 0, 0, 0.08)", !e.controlRowHasComponent(a[0], a[1]) && o && (t.target.style.height = "60px"))
            }
        }, e.dragLeaveColumn = function(t) {
            var a = t.target.id.split("#");
            "grid" != p && "form" != p && "tab" != p && (e.controlIsEmptyComponent(a[0], a[1], a[2]) && e.componentLeaveStyle(t))
        }, e.dragLeaveColumn = function(t) {
            var a = t.target.id.split("#");
            "grid" != p && "form" != p && "tab" != p && (e.controlIsEmptyComponent(a[0], a[1], a[2]) && e.componentLeaveStyle(t));
            t.preventDefault()
        }, e.dragLeaveForm = function(e) {
            e.target.style.backgroundColor = ""
        }, e.dragLeaveOnBreakBetweenForms = function(e) {
            e.stopPropagation(), document.getElementById(e.target.id).style.height = "15px", e.target.style.backgroundColor = ""
        }, e.dragLeaveOnBreakBetweenRows = function(e) {
            e.stopPropagation(), document.getElementById(e.target.id).style.height = "8px", e.target.style.backgroundColor = ""
        }, e.drag = function(e) {
            e.dataTransfer.setData("Text", e.currentTarget.id), p = e.currentTarget.id
        }, e.dropOnForm = function(a) {
            a.preventDefault(), a.stopPropagation(), t.isEditorSaved = !1;
            var o = p,
                i = a.target.id.split("#");
            if ("grid" == o) {
                for (var s = d.createNewRow(e.currentPage.forms[i[0]].rows.length), r = 0; r < t.allComponents.length; r++) s.components[0].type == t.allComponents[r].type && (s.components[0].id = t.allComponents[r].id, s.components[1].id = t.allComponents[r].id);
                e.$apply((function() {
                    e.currentPage.forms[i[0]].rows.push(s)
                }))
            } else l.error(n("translate")("PALETTE_ERRORMESSAGE_INSERTGRID"), "");
            a.target.style.backgroundColor = ""
        }, e.dropOnBreakBetweenForms = function(t) {
            t.preventDefault(), t.stopPropagation();
            var a = t.target.id.split("#"),
                o = p,
                i = Number(a[0]);
            if ("form" == o) {
                var s = d.createNewForm();
                "topOfForm" == a[0] ? e.$apply((function() {
                    e.currentPage.forms.splice(0, 0, s)
                })) : e.$apply((function() {
                    e.currentPage.forms.splice(i, 0, s)
                }))
            } else if ("tab" == o) e.currentPage.navigations.length <= 0 && e.$apply((function() {
                e.currentPage.navigations.push({
                    name: "",
                    functions: {},
                    orderNumber: 0
                })
            }));
            else if ("" != o) {
                var r = o.split("#");
                if (r.length > 1) {
                    if ("form" == r[1]) {
                        var c = e.currentPage.forms[r[0]];
                        r[0] > a[0] ? e.$apply((function() {
                            e.currentPage.forms.splice(r[0], 1), e.currentPage.forms.splice(i, 0, c)
                        })) : e.$apply((function() {
                            e.currentPage.forms.splice(r[0], 1), e.currentPage.forms.splice(i - 1, 0, c)
                        }))
                    }
                } else l.error(n("translate")("PALETTE_ERRORMESSAGE_INSERTFORM"), "")
            }
            document.getElementById(t.target.id).style.height = "15px", t.target.style.backgroundColor = ""
        }, e.dropOnBreakBetweenRows = function(t) {
            t.preventDefault(), t.stopPropagation();
            var a = t.target.id.split("#"),
                o = "",
                i = p;
            if (o = "lastRowBreak" == a[1] ? e.currentPage.forms[a[0]].rows.length : Number(a[1]), "grid" == i)
                if (d.getCountOfRow(e.currentPage) <= 50) {
                    var s = d.createNewRow(e.currentPage.forms[a[0]].rows.length);
                    s = d.setRowComponentsId(s), e.$apply((function() {
                        e.currentPage.forms[a[0]].rows.splice(o, 0, s)
                    }))
                } else l.error(n("translate")("ROW_LIMITATION_ERROR"), "");
            else {
                var r = i.split("#");
                if (3 == r.length) {
                    if ("row" == r[2]) {
                        var c = e.currentPage.forms[r[0]].rows[r[1]];
                        r[1] > o ? e.$apply((function() {
                            e.currentPage.forms[a[0]].rows.splice(r[1], 1), e.currentPage.forms[a[0]].rows.splice(o, 0, c)
                        })) : e.$apply((function() {
                            e.currentPage.forms[a[0]].rows.splice(r[1], 1), e.currentPage.forms[a[0]].rows.splice(o - 1, 0, c)
                        }))
                    }
                } else l.error(n("translate")("PALETTE_ERRORMESSAGE_INSERTGRID"), "")
            }
            document.getElementById(t.target.id).style.height = "8px", t.target.style.backgroundColor = ""
        }, e.dropOnColumn = function(a) {
            a.preventDefault(), t.isEditorSaved = !1, a.target.style.backgroundColor = "", a.target.style.height = "";
            var o = {
                Button: {
                    options: [{
                        name: "value",
                        key: "Button",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Button"
                    }, {
                        name: "color",
                        key: "",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Button"
                    }, {
                        name: "size",
                        key: "",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Button"
                    }, {
                        name: "style",
                        key: "",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Button"
                    }]
                },
                TextBox: {
                    options: [{
                        name: "placeholder",
                        key: "",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        id: "",
                        name: "textValue",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "type",
                        key: "text",
                        orderNumber: "3",
                        value: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "isUnique",
                        key: "",
                        orderNumber: "4",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "description",
                        key: "",
                        orderNumber: "5",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "readonly",
                        key: "false",
                        orderNumber: "6",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }]
                },
                TextArea: {
                    options: [{
                        name: "placeholder",
                        key: "",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextArea"
                    }, {
                        id: "",
                        name: "textValue",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        optionTypeId: "",
                        type: "TextArea"
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "cols",
                        key: "",
                        orderNumber: "3",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextArea"
                    }, {
                        name: "rows",
                        key: "",
                        orderNumber: "4",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextArea"
                    }]
                },
                Paragraph: {
                    options: [{
                        name: "value",
                        key: "",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Paragraph"
                    }]
                },
                CheckBox: {
                    options: [{
                        name: "label",
                        key: "",
                        orderNumber: "0",
                        type: "Label",
                        id: "",
                        optionTypeId: ""
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "CheckBox"
                    }, {
                        id: "",
                        name: "",
                        key: "",
                        orderNumber: "2",
                        type: "Option",
                        optionTypeId: ""
                    }]
                },
                RadioButton: {
                    options: [{
                        name: "label",
                        key: "",
                        orderNumber: "0",
                        type: "Label",
                        id: "",
                        optionTypeId: ""
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "RadioButton"
                    }, {
                        id: "",
                        name: "",
                        key: "",
                        orderNumber: "2",
                        type: "Option",
                        optionTypeId: ""
                    }]
                },
                SelectBox: {
                    options: [{
                        name: "label",
                        key: "",
                        orderNumber: "0",
                        type: "Label",
                        id: "",
                        optionTypeId: ""
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "SelectBox"
                    }, {
                        id: "",
                        name: "",
                        key: "",
                        orderNumber: "2",
                        type: "Option",
                        optionTypeId: ""
                    }]
                },
                BarcodeReader: {
                    options: [{
                        name: "isUnique",
                        key: "true",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "BarcodeReader"
                    }, {
                        name: "buttonName",
                        key: "Scan",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "BarcodeReader"
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "TextBox"
                    }, {
                        name: "color",
                        key: "",
                        orderNumber: "3",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "BarcodeReader"
                    }, {
                        name: "style",
                        key: "",
                        orderNumber: "4",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "BarcodeReader"
                    }, {
                        name: "description",
                        key: "",
                        orderNumber: "5",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "BarcodeReader"
                    }]
                },
                Text: {
                    options: [{
                        name: "label",
                        key: "Text",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Text"
                    }, {
                        name: "bold",
                        key: "false",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Text"
                    }, {
                        name: "italic",
                        key: "false",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Text"
                    }, {
                        name: "underline",
                        key: "false",
                        orderNumber: "3",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Text"
                    }, {
                        name: "font-size",
                        key: 14,
                        orderNumber: "4",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Text"
                    }]
                },
                Camera: {
                    options: [{
                        name: "buttonName",
                        key: "TAKE PHOTO",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Camera"
                    }, {
                        name: "color",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Camera"
                    }, {
                        name: "style",
                        key: "",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Camera"
                    }]
                },
                MultiSelectBox: {
                    options: [{
                        name: "label",
                        key: "Text",
                        orderNumber: "0",
                        type: "Label",
                        id: "",
                        optionTypeId: ""
                    }, {
                        name: "alias",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "MultiSelectBox"
                    }, {
                        id: "",
                        name: "",
                        key: "",
                        orderNumber: "2",
                        type: "Option",
                        optionTypeId: ""
                    }]
                },
                Info: {
                    options: [{
                        name: "content",
                        key: "",
                        orderNumber: "",
                        id: "",
                        optionTypeId: "",
                        type: "Info"
                    }]
                },
                DetailCamera: {
                    options: [{
                        name: "buttonName",
                        key: "TAKE PHOTO",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "DetailCamera"
                    }, {
                        name: "color",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "DetailCamera"
                    }, {
                        name: "style",
                        key: "",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "DetailCamera"
                    }]
                },
                Video: {
                    options: [{
                        name: "buttonName",
                        key: "RECORD VIDEO",
                        orderNumber: "0",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Video"
                    }, {
                        name: "color",
                        key: "",
                        orderNumber: "1",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Video"
                    }, {
                        name: "style",
                        key: "",
                        orderNumber: "2",
                        value: "",
                        id: "",
                        optionTypeId: "",
                        type: "Video"
                    }]
                },
                Signature: {
                    options: []
                },
                Image: {
                    options: [{
                        name: "imageSource",
                        key: "app/img/image.svg",
                        orderNumber: "0",
                        id: "",
                        optionTypeId: "",
                        type: "Image"
                    }, {
                        name: "imageWidth",
                        key: "100",
                        orderNumber: "1",
                        id: "",
                        optionTypeId: "",
                        type: "Image"
                    }, {
                        name: "imageHeight",
                        key: "",
                        orderNumber: "2",
                        id: "",
                        optionTypeId: "",
                        type: "Image"
                    }]
                }
            };
            if (a.stopPropagation(), "" != a.target.id) {
                var i = p;
                if ("div" != a.target.localName) return;
                var s = i.split("#"),
                    r = a.target.id.split("#"),
                    c = !1;
                if (document.getElementById(a.target.id).click(), "column" == s[3] && (c = !0, e.$apply((function() {
                        for (var a = angular.copy(e.currentPage.forms[s[0]].rows[s[1]].components[s[2]]), o = d.createNewComponent(0, a.rowNumber), n = d.generateEmptyComponent(o), i = 0; i < t.allComponents.length; i++) n.type == t.allComponents[i].type && (n.id = t.allComponents[i].id);
                        e.currentPage.forms[s[0]].rows[s[1]].components[s[2]] = n, a.shortName = d.getShortName(a.type), e.currentPage.forms[r[0]].rows[r[1]].components[r[2]] = a
                    }))), void 0 !== o[i]) {
                    var m = e.currentPage.forms[r[0]].rows[r[1]].components[r[2]];
                    m.type = i, "BarcodeReader" == i && t.uniqueCount++;
                    for (var u = 0; u < t.allComponents.length; u++) i == t.allComponents[u].type && (m.id = t.allComponents[u].id);
                    for (u = 0; u < o[i].options.length; u++) o[i].options[u] = d.setComponentOptionsId(o[i].options[u]);
                    m.options = o[i].options, m.shortName = d.getShortName(i)
                } else c || (l.error(n("translate")("PALETTE_ERRORMESSAGE_INSERTCOLUMN"), ""), e.componentLeaveStyle(a))
            }
        }, e.dropOnPage = function(a) {
            a.preventDefault(), a.stopPropagation(), t.isEditorSaved = !1;
            var o = p;
            if ("tab" == o) e.currentPage.navigations.length <= 0 && e.$apply((function() {
                e.currentPage.navigations.push({
                    name: "",
                    functions: {},
                    orderNumber: 0
                })
            }));
            else if ("form" == o && 0 == e.currentPage.forms.length) {
                var i = d.createNewForm();
                e.$apply((function() {
                    e.currentPage.forms.push(i)
                }))
            } else l.error(n("translate")("PALETTE_ERRORMESSAGE_INSERTNAVIGATIONORFORM"), "")
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModal", "$cookies", "$filter", "Core", "serviceImplementation", "paletteURL", "toastr", "$window", "paletteService"], angular.module("BlurAdmin.pages.form-management").controller("paletteCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n) {
        return {
            getShortName: function(e) {
                return e + (new Date).getTime() + Math.floor(100 * Math.random() + 1)
            },
            generateEmptyComponent: function(e) {
                e.type = "EmptyComponent";
                for (var a = 0; a < t.allComponents.length; a++) e.type == t.allComponents[a].type && (e.id = t.allComponents[a].id);
                return e
            },
            createNewComponent: function(e, t) {
                var a = {
                    colNumber: e,
                    rowNumber: t,
                    colSize: "",
                    options: [],
                    events: [],
                    validations: [],
                    type: "",
                    shortName: this.getShortName("Component"),
                    datasourceType: !1
                };
                return a = this.generateEmptyComponent(a)
            },
            createNewRow: function(e) {
                var t = {},
                    a = this.createNewComponent(0, e),
                    o = this.createNewComponent(0, e);
                return t.components = [], t.components.push(a), t.components.push(o), t
            },
            createNewOption: function(e) {
                for (var a = "", o = 0; o < t.allOptionTypes.length; o++) "Option" == t.allOptionTypes[o].name && (a = t.allOptionTypes[o].id);
                return {
                    name: "",
                    key: "",
                    orderNumber: e,
                    type: "Option",
                    optionTypeId: a,
                    id: ""
                }
            },
            createNewTab: function(e) {
                return {
                    name: "",
                    functions: {},
                    orderNumber: e
                }
            },
            createNewPage: function(e) {
                var a = {
                    id: "",
                    title: e,
                    homePage: !0,
                    navigations: [],
                    forms: [],
                    shortName: this.getShortName("Page"),
                    pageNumber: t.currentApp.pages.length + 1
                };
                a.forms.push(this.createNewForm());
                var o = this.createNewRow(a.forms[0].rows.length);
                return o = this.setRowComponentsId(o), a.forms[0].rows.push(o), a
            },
            createNewForm: function() {
                return {
                    id: "",
                    title: "",
                    rows: [],
                    shortName: this.getShortName("Form")
                }
            },
            deleteUniqueComponent: function(e) {
                if ("TextBox" == e.type || "BarcodeReader" == e.type)
                    for (var a = 0; a < e.options.length; a++) "isUnique" == e.options[a].name && "true" == e.options[a].key && t.uniqueCount--
            },
            setComponentOptionsId: function(e) {
                for (var a = 0; a < t.allOptionTypes.length; a++) e.type == t.allOptionTypes[a].name && (e.optionTypeId = t.allOptionTypes[a].id);
                return e
            },
            setRowComponentsId: function(e) {
                for (var a = 0; a < t.allComponents.length; a++) e.components[0].type == t.allComponents[a].type && (e.components[0].id = t.allComponents[a].id, e.components[1].id = t.allComponents[a].id);
                return e
            },
            sendInfoComponentImages: function(e, t, i) {
                var s = {};
                s.data = e, s.applicationId = t, s.userName = i, s.type = n.INFO_PICTURES, a.service("POST", o.sendInfoComponentImages, {}, s)
            },
            getInfoComponentImages: function(e) {
                for (var t = [], a = [], o = 0; o < e.length; o++)
                    if ("content" == e[o].name && null != e[o].key)
                        for (var n = /<img.*?src="([^">]*\/([^">]*?))".*?>/g; t = n.exec(e[o].key);) {
                            var i = {
                                name: ""
                            };
                            i.name = t[2], a.push(i)
                        }
                return a
            },
            getCountOfRow: function(e) {
                for (var t = 0, a = 0; a < e.forms.length; a++) t += e.forms[a].rows.length;
                return console.log("Count number:" + t), t
            },
            sortApplicationPagesByPageNumber: function() {
                t.currentApp.pages.sort((function(e, t) {
                    return e.pageNumber - t.pageNumber
                }))
            }
        }
    }
    e.$inject = ["$timeout", "$rootScope", "serviceImplementation", "paletteURL", "documentType"], angular.module("BlurAdmin.pages.form-management").factory("paletteService", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.report").directive("hint", (function() {
        return {
            restrict: "A",
            priority: 1,
            terminal: !0,
            link: function(e, t, a) {
                var o = a.ngClick,
                    n = t.bind("click", (function() {
                        null == a.disabled && e.$eval(o)
                    }));
                e.$on("$destroy", (function() {
                    n()
                }))
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.emailexist = !1, e.userexist = !1, e.personalInfoForm = {};
        var r = i.get("username");
        a.service("POST", o.getUserInformationURL, {}, r).then((function(t) {
            e.userInformation = t
        })), e.updateUserInformation = function() {
            var t = {};
            t.data = e.userInformation, t.userName = i.get("username"), a.service("POST", o.updateUserURL, {}, t).then((function(t) {
                "105" == t && (e.userexist = !0, e.personalInfoForm.user.username.$invalid = !0), "106" == t && (e.emailexist = !0, e.personalInfoForm.user.email.$invalid = !0), "107" == t && n.success(s("translate")("USERPAGE_UPDATESUCCESSMESSAGE"), "")
            }), (function() {
                n.error(s("translate")("USERPAGE_UPDATEERRORMESSAGE"), "")
            }))
        }
    }
    e.$inject = ["$scope", "$uibModal", "serviceImplementation", "profileURLs", "toastr", "$cookies", "$filter"], angular.module("BlurAdmin.pages.profile").controller("ProfilePageCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d, p, m) {
        e.itemPerPage = 5, e.taskStatus = p;
        var u = [];
        c.changePreLoaderColor(), n.isStatusSet ? e.isLoading = !1 : e.isLoading = !0, u[0] = l("translate")("TASKNAME_LISTTASKPAGE"), u[1] = l("translate")("TASKDESCRIPTION_LISTTASKPAGE"), u[2] = l("translate")("TASK_ASSIGNMENT_DATE"), u[3] = l("translate")("TASK_EXPIRE_DATE"), u[4] = l("translate")("TASKBARCODE_LISTTASKPAGE"), u[5] = l("translate")("TASKEQUIPMENT_LISTTASKPAGE"), u[6] = l("translate")("TASKREJECT_LISTTASKPAGE"), u[7] = l("translate")("TASKSTATE_LISTTASKPAGE"), u[8] = l("translate")("REPORTRESULT_REPORT"), e.columns = u;
        var g;
        return g = o.get("username"), t.service("POST", a.getTasksURL, {}, g).then((function(t) {
            e.isLoading = !1, e.allTasks = t
        })), e.displayedAllLogs = [].concat(e.allTasks), e.showEquipment = function(t) {
            e.allEquipment = t ? t.equipmentList : [], m.open({
                animation: !1,
                scope: e,
                templateUrl: "app/pages/task/equipmentModal.html"
            })
        }, e.getReport = function(a, o) {
            n.getReportApplicationId = a, n.getReportControlMetadataId = o;
            var i = {},
                s = o;
            t.service("POST", d.getReportResultStatusURL, i, s).then((function(t) {
                e.reportStatusValue = t
            }));
            i = {}, s = a;
            e.controlMetadataId = o, t.service("POST", d.getApplicationDocumentsURL, i, s).then((function(t) {
                e.allDocuments = t, m.open({
                    animation: !1,
                    scope: e,
                    controller: "documentCTRL",
                    templateUrl: "app/pages/report/report-result/documentsModal/allDocumentsModal.html"
                })
            }))
        }, e.loadAssignmentsToView = function(o) {
            n.stateOfControl = o.stateOfControl, s.setDefaultFormVariables(), e.isLoading = !0, n.isPageFromTask = !0;
            var l = o.application.id,
                c = "",
                p = {};
            p.applicationId = l, t.service("POST", d.getApplicationsURL, {}, p).then((function(s) {
                n.userForm = s[0], r.id = s[0].id, r.name = s[0].name, r.version = s[0].version, r.shortName = s[0].shortName, r.description = s[0].description, r.userApplicationId = s[0].userApplicationId, r.pages = s[0].pages, angular.forEach(r.pages, (function(e, t) {
                    e.homePage && (c = e.shortName)
                })), n.formData = {};
                var l = {
                    applicationId: r.id
                };
                console.log("dataDraftFormData", l), n.draftDataExist = !1, t.service("POST", a.getDataDraftURL, {}, l).then((function(t) {
                    try {
                        n.formData = JSON.parse(t.serializedData), console.log("Draft applied", n.formData);
                        var a = Object.keys(n.formData);
                        angular.forEach(a, (function(e) {
                            if (-1 != e.indexOf("CheckBox") || -1 != e.indexOf("MultiSelectBox")) try {
                                n.formData[e] = JSON.parse(n.formData[e])
                            } catch (e) {
                                console.error("e", e)
                            }
                        })), n.draftDataExist = !0
                    } catch (e) {}
                    if (!n.draftDataExist && !angular.equals(o.predefinedFormDataList, "{}")) {
                        n.formData = angular.fromJson(o.predefinedFormDataList);
                        a = Object.keys(n.formData);
                        angular.forEach(a, (function(e) {
                            try {
                                n.formData[e] = angular.fromJson(n.formData[e]), "number" == typeof n.formData[e] && (n.formData[e] = n.formData[e] + "")
                            } catch (t) {
                                n.formData[e] = n.formData[e] + ""
                            }
                        }))
                    }
                    n.pageShortName = c, n.userAssignmentId = o.id, n.selectedFormVersion = s[0].version.version, n.pageHistory.push(n.pageShortName), e.isLoading = !1, i.go("form")
                }), (function(t) {
                    if (!angular.equals(o.predefinedFormDataList, "{}")) {
                        n.formData = angular.fromJson(o.predefinedFormDataList);
                        var a = Object.keys(n.formData);
                        angular.forEach(a, (function(e) {
                            try {
                                n.formData[e] = angular.fromJson(n.formData[e]), "number" == typeof n.formData[e] && (n.formData[e] = n.formData[e] + "")
                            } catch (t) {
                                n.formData[e] = n.formData[e] + ""
                            }
                        }))
                    }
                    n.pageShortName = c, n.userAssignmentId = o.id, n.selectedFormVersion = s[0].version.version, n.pageHistory.push(n.pageShortName), e.isLoading = !1, i.go("form")
                }))
            }), (function() {
                e.isLoading = !1
            }))
        }, null
    }
    e.$inject = ["$scope", "serviceImplementation", "formURLs", "$cookies", "$rootScope", "$state", "formService", "Application", "$filter", "Core", "ReportServiceURLs", "taskStatus", "$uibModal"], angular.module("BlurAdmin.pages.task").controller("taskCTRL", e)
}(),
function() {
    "use strict";

    function e(e) {
        angular.extend(e, {
            closeButton: !0,
            closeHtml: "<button>&times;</button>",
            timeOut: 5e3,
            autoDismiss: !1,
            containerId: "toast-container",
            maxOpened: 0,
            newestOnTop: !0,
            positionClass: "toast-top-right",
            preventDuplicates: !1,
            preventOpenDuplicates: !1,
            target: "body"
        })
    }
    e.$inject = ["toastrConfig"], angular.module("BlurAdmin.theme.components").config(e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            link: function(t, a) {
                e((function() {
                    var t = a.attr("new-value"),
                        o = parseInt(a.html());

                    function n(t) {
                        e((function() {
                            a.html(t)
                        }), 30)
                    }
                    if (t > o)
                        for (var i = o; i <= t; i++) n(i);
                    else
                        for (var s = o; s >= t; s--) n(s);
                    e((function() {
                        a.next().find("i").addClass("show-arr")
                    }), 500)
                }), 3500)
            }
        }
    }
    e.$inject = ["$timeout"], angular.module("BlurAdmin.theme").directive("animatedChange", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").directive("autoExpand", (function() {
        return {
            restrict: "A",
            link: function(e, t) {
                t.bind("keydown", (function(e) {
                    var t = e.target;
                    $(t).height(0);
                    var a = $(t)[0].scrollHeight;
                    a = a < 16 ? 16 : a, $(t).height(a)
                })), setTimeout((function() {
                    var e = t;
                    $(e).height(0);
                    var a = $(e)[0].scrollHeight;
                    a = a < 16 ? 16 : a, $(e).height(a)
                }), 0)
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            link: function(a, o, n) {
                var i = t(n.autoFocus);
                a.$watch(i, (function(t) {
                    !0 === t && e((function() {
                        o[0].focus(), o[0].select()
                    }))
                })), o.bind("blur", (function() {
                    a.$apply(i.assign(a, !1))
                }))
            }
        }
    }
    e.$inject = ["$timeout", "$parse"], angular.module("BlurAdmin.theme").directive("autoFocus", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").directive("includeWithScope", (function() {
        return {
            restrict: "AE",
            templateUrl: function(e, t) {
                return t.includeWithScope
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e) {
        return {
            restrict: "EA",
            template: "<div></div>",
            replace: !0,
            scope: {
                min: "=",
                max: "=",
                type: "@",
                prefix: "@",
                maxPostfix: "@",
                prettify: "=",
                prettifySeparator: "@",
                grid: "=",
                gridMargin: "@",
                postfix: "@",
                step: "@",
                hideMinMax: "@",
                hideFromTo: "@",
                from: "=",
                to: "=",
                disable: "=",
                onChange: "=",
                onFinish: "=",
                values: "=",
                timeout: "@"
            },
            link: function(t, a) {
                a.ionRangeSlider({
                    min: t.min,
                    max: t.max,
                    type: t.type,
                    prefix: t.prefix,
                    maxPostfix: t.maxPostfix,
                    prettify_enabled: t.prettify,
                    prettify_separator: t.prettifySeparator,
                    grid: t.grid,
                    gridMargin: t.gridMargin,
                    postfix: t.postfix,
                    step: t.step,
                    hideMinMax: t.hideMinMax,
                    hideFromTo: t.hideFromTo,
                    from: t.from,
                    to: t.to,
                    disable: t.disable,
                    onChange: t.onChange,
                    onFinish: t.onFinish,
                    values: t.values
                }), t.$watch("min", (function(t) {
                    e((function() {
                        a.data("ionRangeSlider").update({
                            min: t
                        })
                    }))
                }), !0), t.$watch("max", (function(t) {
                    e((function() {
                        a.data("ionRangeSlider").update({
                            max: t
                        })
                    }))
                })), t.$watch("from", (function(t) {
                    e((function() {
                        a.data("ionRangeSlider").update({
                            from: t
                        })
                    }))
                })), t.$watch("to", (function(t) {
                    e((function() {
                        a.data("ionRangeSlider").update({
                            to: t
                        })
                    }))
                })), t.$watch("disable", (function(t) {
                    e((function() {
                        a.data("ionRangeSlider").update({
                            disable: t
                        })
                    }))
                }))
            }
        }
    }
    e.$inject = ["$timeout"], angular.module("BlurAdmin.theme").directive("ionSlider", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").directive("ngFileSelect", (function() {
        return {
            link: function(e, t) {
                t.bind("change", (function(t) {
                    e.file = (t.srcElement || t.target).files[0], e.getFile()
                }))
            }
        }
    }))
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").directive("scrollPosition", (function() {
        return {
            scope: {
                scrollPosition: "=",
                maxHeight: "="
            },
            link: function(e) {
                $(window).on("scroll", (function() {
                    var t = $(window).scrollTop() > e.maxHeight;
                    t !== e.prevScrollTop && e.$apply((function() {
                        e.scrollPosition = t
                    })), e.prevScrollTop = t
                }))
            }
        }
    }))
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").directive("trackWidth", (function() {
        return {
            scope: {
                trackWidth: "=",
                minWidth: "="
            },
            link: function(e, t) {
                e.trackWidth = $(t).width() < e.minWidth, e.prevTrackWidth = e.trackWidth, $(window).resize((function() {
                    var a = $(t).width() < e.minWidth;
                    a !== e.prevTrackWidth && e.$apply((function() {
                        e.trackWidth = a
                    })), e.prevTrackWidth = a
                }))
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            restrict: "A",
            link: function(a, o) {
                var n = 1e3;
                t.$pageFinishedLoading && (n = 100), e((function() {
                    o.removeClass("full-invisible"), o.addClass("animated zoomIn")
                }), n)
            }
        }
    }
    e.$inject = ["$timeout", "$rootScope"], angular.module("BlurAdmin.theme").directive("zoomIn", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = {},
            a = 0,
            o = !1;
        return {
            setProgress: function(e) {
                if (e > 100) throw Error("Progress can't be greater than max");
                a = e
            },
            getProgress: function() {
                return a
            },
            open: function() {
                if (o) throw Error("Progress modal opened now");
                t = e.open({
                    animation: !0,
                    templateUrl: "app/pages/ui/modals/progressModal/progressModal.html",
                    size: "sm",
                    keyboard: !1,
                    backdrop: "static"
                }), o = !0
            },
            close: function() {
                if (!o) throw Error("Progress modal is not active");
                t.close(), o = !1
            }
        }
    }
    e.$inject = ["$uibModal"], angular.module("BlurAdmin.theme").factory("baProgressModal", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").service("baUtil", (function() {
        this.isDescendant = function(e, t) {
            for (var a = t.parentNode; null != a;) {
                if (a == e) return !0;
                a = a.parentNode
            }
            return !1
        }, this.hexToRGB = function(e, t) {
            return "rgba(" + parseInt(e.slice(1, 3), 16) + ", " + parseInt(e.slice(3, 5), 16) + ", " + parseInt(e.slice(5, 7), 16) + ", " + t + ")"
        }, this.hasAttr = function(e, t) {
            var a = $(e).attr(t);
            return void 0 !== a && !1 !== a
        }
    }))
}(),
function() {
    "use strict";

    function e(e) {
        return {
            readAsDataUrl: function(t, a) {
                var o = e.defer(),
                    n = function(e, t) {
                        var a = new FileReader;
                        return a.onload = function(e, t, a) {
                            return function() {
                                a.$apply((function() {
                                    t.resolve(e.result)
                                }))
                            }
                        }(a, e, t), a.onerror = function(e, t, a) {
                            return function() {
                                a.$apply((function() {
                                    t.reject(e.result)
                                }))
                            }
                        }(a, e, t), a.onprogress = function(e, t) {
                            return function(e) {
                                t.$broadcast("fileProgress", {
                                    total: e.total,
                                    loaded: e.loaded
                                })
                            }
                        }(0, t), a
                    }(o, a);
                return n.readAsDataURL(t), o.promise
            }
        }
    }
    e.$inject = ["$q"], angular.module("BlurAdmin.theme").service("fileReader", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            loadImg: function(t) {
                var a = e.defer(),
                    o = new Image;
                return o.src = t, o.onload = function() {
                    a.resolve()
                }, a.promise
            },
            loadAmCharts: function() {
                var t = e.defer();
                return AmCharts.ready((function() {
                    t.resolve()
                })), t.promise
            }
        }
    }
    e.$inject = ["$q"], angular.module("BlurAdmin.theme").service("preloader", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            start: function(t, a, o) {
                function n() {
                    return t(a, o)
                }
                var i = n();
                angular.element(e).bind("focus", (function() {
                    i && t.cancel(i), i = n()
                })), angular.element(e).bind("blur", (function() {
                    i && t.cancel(i)
                }))
            }
        }
    }
    e.$inject = ["$window"], angular.module("BlurAdmin.theme").service("stopableInterval", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("blurFeed", (function() {
        return {
            restrict: "E",
            controller: "BlurFeedCtrl",
            templateUrl: "app/pages/dashboard/blurFeed/blurFeed.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e) {
        e.feed = [{
            type: "text-message",
            author: "Kostya",
            surname: "Danovsky",
            header: "Posted new message",
            text: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
            time: "Today 11:55 pm",
            ago: "25 minutes ago",
            expanded: !1
        }, {
            type: "video-message",
            author: "Andrey",
            surname: "Hrabouski",
            header: "Added new video",
            text: '"Vader and Me"',
            preview: "app/feed/vader-and-me-preview.png",
            link: "https://www.youtube.com/watch?v=IfcpzBbbamk",
            time: "Today 9:30 pm",
            ago: "3 hrs ago",
            expanded: !1
        }, {
            type: "image-message",
            author: "Vlad",
            surname: "Lugovsky",
            header: "Added new image",
            text: '"My little kitten"',
            preview: "app/feed/my-little-kitten.png",
            link: "http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg",
            time: "Today 2:20 pm",
            ago: "10 hrs ago",
            expanded: !1
        }, {
            type: "text-message",
            author: "Nasta",
            surname: "Linnie",
            header: "Posted new message",
            text: "Haha lol",
            time: "11.11.2015",
            ago: "2 days ago",
            expanded: !1
        }, {
            type: "geo-message",
            author: "Nick",
            surname: "Cat",
            header: "Posted location",
            text: '"New York, USA"',
            preview: "app/feed/new-york-location.png",
            link: "https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z",
            time: "11.11.2015",
            ago: "2 days ago",
            expanded: !1
        }, {
            type: "text-message",
            author: "Vlad",
            surname: "Lugovsky",
            header: "Posted new message",
            text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
            time: "12.11.2015",
            ago: "3 days ago",
            expanded: !1
        }, {
            type: "text-message",
            author: "Andrey",
            surname: "Hrabouski",
            header: "Posted new message",
            text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".',
            time: "14.11.2015",
            ago: "5 days ago",
            expanded: !1
        }, {
            type: "text-message",
            author: "Nasta",
            surname: "Linnie",
            header: "Posted new message",
            text: "When your hammer is C++, everything begins to look like a thumb.",
            time: "14.11.2015",
            ago: "5 days ago",
            expanded: !1
        }, {
            type: "text-message",
            author: "Alexander",
            surname: "Demeshko",
            header: "Posted new message",
            text: '“I mean, they say you die twice. One time when you stop breathing and a second time, a bit later on, when somebody says your name for the last time." ©',
            time: "15.11.2015",
            ago: "6 days ago",
            expanded: !1
        }, {
            type: "image-message",
            author: "Nick",
            surname: "Cat",
            header: "Posted photo",
            text: '"Protein Heroes"',
            preview: "app/feed/genom.png",
            link: "https://dribbble.com/shots/2504810-Protein-Heroes",
            time: "16.11.2015",
            ago: "7 days ago",
            expanded: !1
        }, {
            type: "text-message",
            author: "Kostya",
            surname: "Danovsky",
            header: "Posted new message",
            text: "Why did the CoffeeScript developer keep getting lost? Because he couldn't find his source without a map",
            time: "18.11.2015",
            ago: "9 days ago",
            expanded: !1
        }], e.expandMessage = function(e) {
            e.expanded = !e.expanded
        }
    }
    e.$inject = ["$scope"], angular.module("BlurAdmin.pages.dashboard").controller("BlurFeedCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").service("dashboardCalendar", (function() {}))
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("dashboardCalendar", (function() {
        return {
            restrict: "E",
            controller: "DashboardCalendarCtrl",
            templateUrl: "app/pages/dashboard/dashboardCalendar/dashboardCalendar.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e) {
        var t = e.colors.dashboard,
            a = $("#calendar").fullCalendar({
                header: {
                    left: "prev,next today",
                    center: "title",
                    right: "month,agendaWeek,agendaDay"
                },
                defaultDate: "2016-03-08",
                selectable: !0,
                selectHelper: !0,
                select: function(e, t) {
                    var o, n = prompt("Event Title:");
                    n && (o = {
                        title: n,
                        start: e,
                        end: t
                    }, a.fullCalendar("renderEvent", o, !0)), a.fullCalendar("unselect")
                },
                editable: !0,
                eventLimit: !0,
                events: [{
                    title: "All Day Event",
                    start: "2016-03-01",
                    color: t.silverTree
                }, {
                    title: "Long Event",
                    start: "2016-03-07",
                    end: "2016-03-10",
                    color: t.blueStone
                }, {
                    title: "Dinner",
                    start: "2016-03-14T20:00:00",
                    color: t.surfieGreen
                }, {
                    title: "Birthday Party",
                    start: "2016-04-01T07:00:00",
                    color: t.gossipDark
                }]
            })
    }
    e.$inject = ["baConfig"], angular.module("BlurAdmin.pages.dashboard").controller("DashboardCalendarCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("dashboardLineChart", (function() {
        return {
            restrict: "E",
            controller: "DashboardLineChartCtrl",
            templateUrl: "app/pages/dashboard/dashboardLineChart/dashboardLineChart.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var o = e.colors,
            n = e.theme.blur ? "#000000" : o.primary,
            i = [{
                date: new Date(2012, 11),
                value: 0,
                value0: 0
            }, {
                date: new Date(2013, 0),
                value: 15e3,
                value0: 19e3
            }, {
                date: new Date(2013, 1),
                value: 3e4,
                value0: 2e4
            }, {
                date: new Date(2013, 2),
                value: 25e3,
                value0: 22e3
            }, {
                date: new Date(2013, 3),
                value: 21e3,
                value0: 25e3
            }, {
                date: new Date(2013, 4),
                value: 24e3,
                value0: 29e3
            }, {
                date: new Date(2013, 5),
                value: 31e3,
                value0: 26e3
            }, {
                date: new Date(2013, 6),
                value: 4e4,
                value0: 25e3
            }, {
                date: new Date(2013, 7),
                value: 37e3,
                value0: 2e4
            }, {
                date: new Date(2013, 8),
                value: 18e3,
                value0: 22e3
            }, {
                date: new Date(2013, 9),
                value: 5e3,
                value0: 26e3
            }, {
                date: new Date(2013, 10),
                value: 4e4,
                value0: 3e4
            }, {
                date: new Date(2013, 11),
                value: 2e4,
                value0: 25e3
            }, {
                date: new Date(2014, 0),
                value: 5e3,
                value0: 13e3
            }, {
                date: new Date(2014, 1),
                value: 3e3,
                value0: 13e3
            }, {
                date: new Date(2014, 2),
                value: 1800,
                value0: 13e3
            }, {
                date: new Date(2014, 3),
                value: 10400,
                value0: 13e3
            }, {
                date: new Date(2014, 4),
                value: 25500,
                value0: 13e3
            }, {
                date: new Date(2014, 5),
                value: 2100,
                value0: 13e3
            }, {
                date: new Date(2014, 6),
                value: 6500,
                value0: 13e3
            }, {
                date: new Date(2014, 7),
                value: 1100,
                value0: 13e3
            }, {
                date: new Date(2014, 8),
                value: 17200,
                value0: 13e3
            }, {
                date: new Date(2014, 9),
                value: 26900,
                value0: 13e3
            }, {
                date: new Date(2014, 10),
                value: 14100,
                value0: 13e3
            }, {
                date: new Date(2014, 11),
                value: 35300,
                value0: 13e3
            }, {
                date: new Date(2015, 0),
                value: 54800,
                value0: 13e3
            }, {
                date: new Date(2015, 1),
                value: 49800,
                value0: 13e3
            }],
            s = AmCharts.makeChart("amchart", {
                type: "serial",
                theme: "blur",
                marginTop: 15,
                marginRight: 15,
                dataProvider: i,
                categoryField: "date",
                categoryAxis: {
                    parseDates: !0,
                    gridAlpha: 0,
                    color: o.defaultText,
                    axisColor: o.defaultText
                },
                valueAxes: [{
                    minVerticalGap: 50,
                    gridAlpha: 0,
                    color: o.defaultText,
                    axisColor: o.defaultText
                }],
                graphs: [{
                    id: "g0",
                    bullet: "none",
                    useLineColorForBulletBorder: !0,
                    lineColor: a.hexToRGB(n, .3),
                    lineThickness: 1,
                    negativeLineColor: o.danger,
                    type: "smoothedLine",
                    valueField: "value0",
                    fillAlphas: 1,
                    fillColorsField: "lineColor"
                }, {
                    id: "g1",
                    bullet: "none",
                    useLineColorForBulletBorder: !0,
                    lineColor: a.hexToRGB(n, .5),
                    lineThickness: 1,
                    negativeLineColor: o.danger,
                    type: "smoothedLine",
                    valueField: "value",
                    fillAlphas: 1,
                    fillColorsField: "lineColor"
                }],
                chartCursor: {
                    categoryBalloonDateFormat: "MM YYYY",
                    categoryBalloonColor: "#4285F4",
                    categoryBalloonAlpha: .7,
                    cursorAlpha: 0,
                    valueLineEnabled: !0,
                    valueLineBalloonEnabled: !0,
                    valueLineAlpha: .5
                },
                dataDateFormat: "MM YYYY",
                export: {
                    enabled: !0
                },
                creditsPosition: "bottom-right",
                zoomOutButton: {
                    backgroundColor: "#fff",
                    backgroundAlpha: 0
                },
                zoomOutText: "",
                pathToImages: t.images.amChart
            });

        function r() {
            s.zoomToDates(new Date(2013, 3), new Date(2014, 0))
        }
        s.addListener("rendered", r), r(), s.zoomChart && s.zoomChart()
    }
    e.$inject = ["baConfig", "layoutPaths", "baUtil"], angular.module("BlurAdmin.pages.dashboard").controller("DashboardLineChartCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("dashboardMap", (function() {
        return {
            restrict: "E",
            controller: "DashboardMapCtrl",
            templateUrl: "app/pages/dashboard/dashboardMap/dashboardMap.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        var a = e.colors;
        AmCharts.makeChart("amChartMap", {
            type: "map",
            theme: "blur",
            zoomControl: {
                zoomControlEnabled: !1,
                panControlEnabled: !1
            },
            dataProvider: {
                map: "worldLow",
                zoomLevel: 3.5,
                zoomLongitude: 10,
                zoomLatitude: 52,
                areas: [{
                    title: "Austria",
                    id: "AT",
                    color: a.primary,
                    customData: "1 244",
                    groupId: "1"
                }, {
                    title: "Ireland",
                    id: "IE",
                    color: a.primary,
                    customData: "1 342",
                    groupId: "1"
                }, {
                    title: "Denmark",
                    id: "DK",
                    color: a.primary,
                    customData: "1 973",
                    groupId: "1"
                }, {
                    title: "Finland",
                    id: "FI",
                    color: a.primary,
                    customData: "1 573",
                    groupId: "1"
                }, {
                    title: "Sweden",
                    id: "SE",
                    color: a.primary,
                    customData: "1 084",
                    groupId: "1"
                }, {
                    title: "Great Britain",
                    id: "GB",
                    color: a.primary,
                    customData: "1 452",
                    groupId: "1"
                }, {
                    title: "Italy",
                    id: "IT",
                    color: a.primary,
                    customData: "1 321",
                    groupId: "1"
                }, {
                    title: "France",
                    id: "FR",
                    color: a.primary,
                    customData: "1 112",
                    groupId: "1"
                }, {
                    title: "Spain",
                    id: "ES",
                    color: a.primary,
                    customData: "1 865",
                    groupId: "1"
                }, {
                    title: "Greece",
                    id: "GR",
                    color: a.primary,
                    customData: "1 453",
                    groupId: "1"
                }, {
                    title: "Germany",
                    id: "DE",
                    color: a.primary,
                    customData: "1 957",
                    groupId: "1"
                }, {
                    title: "Belgium",
                    id: "BE",
                    color: a.primary,
                    customData: "1 011",
                    groupId: "1"
                }, {
                    title: "Luxembourg",
                    id: "LU",
                    color: a.primary,
                    customData: "1 011",
                    groupId: "1"
                }, {
                    title: "Netherlands",
                    id: "NL",
                    color: a.primary,
                    customData: "1 213",
                    groupId: "1"
                }, {
                    title: "Portugal",
                    id: "PT",
                    color: a.primary,
                    customData: "1 291",
                    groupId: "1"
                }, {
                    title: "Lithuania",
                    id: "LT",
                    color: a.successLight,
                    customData: "567",
                    groupId: "2"
                }, {
                    title: "Latvia",
                    id: "LV",
                    color: a.successLight,
                    customData: "589",
                    groupId: "2"
                }, {
                    title: "Czech Republic ",
                    id: "CZ",
                    color: a.successLight,
                    customData: "785",
                    groupId: "2"
                }, {
                    title: "Slovakia",
                    id: "SK",
                    color: a.successLight,
                    customData: "965",
                    groupId: "2"
                }, {
                    title: "Estonia",
                    id: "EE",
                    color: a.successLight,
                    customData: "685",
                    groupId: "2"
                }, {
                    title: "Hungary",
                    id: "HU",
                    color: a.successLight,
                    customData: "854",
                    groupId: "2"
                }, {
                    title: "Cyprus",
                    id: "CY",
                    color: a.successLight,
                    customData: "754",
                    groupId: "2"
                }, {
                    title: "Malta",
                    id: "MT",
                    color: a.successLight,
                    customData: "867",
                    groupId: "2"
                }, {
                    title: "Poland",
                    id: "PL",
                    color: a.successLight,
                    customData: "759",
                    groupId: "2"
                }, {
                    title: "Romania",
                    id: "RO",
                    color: a.success,
                    customData: "302",
                    groupId: "3"
                }, {
                    title: "Bulgaria",
                    id: "BG",
                    color: a.success,
                    customData: "102",
                    groupId: "3"
                }, {
                    title: "Slovenia",
                    id: "SI",
                    color: a.danger,
                    customData: "23",
                    groupId: "4"
                }, {
                    title: "Croatia",
                    id: "HR",
                    color: a.danger,
                    customData: "96",
                    groupId: "4"
                }]
            },
            areasSettings: {
                rollOverOutlineColor: a.border,
                rollOverColor: a.primaryDark,
                alpha: .8,
                unlistedAreasAlpha: .2,
                unlistedAreasColor: a.defaultText,
                balloonText: "[[title]]: [[customData]] users"
            },
            legend: {
                width: "100%",
                marginRight: 27,
                marginLeft: 27,
                equalWidths: !1,
                backgroundAlpha: .3,
                backgroundColor: a.border,
                borderColor: a.border,
                borderAlpha: 1,
                top: 362,
                left: 0,
                horizontalGap: 10,
                data: [{
                    title: "over 1 000 users",
                    color: a.primary
                }, {
                    title: "500 - 1 000 users",
                    color: a.successLight
                }, {
                    title: "100 - 500 users",
                    color: a.success
                }, {
                    title: "0 - 100 users",
                    color: a.danger
                }]
            },
            export: {
                enabled: !0
            },
            creditsPosition: "bottom-right",
            pathToImages: t.images.amChart
        })
    }
    e.$inject = ["baConfig", "layoutPaths"], angular.module("BlurAdmin.pages.dashboard").controller("DashboardMapCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("popularApp", (function() {
        return {
            restrict: "E",
            templateUrl: "app/pages/dashboard/popularApp/popularApp.html"
        }
    }))
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("dashboardPieChart", (function() {
        return {
            restrict: "E",
            controller: "DashboardPieChartCtrl",
            templateUrl: "app/pages/dashboard/dashboardPieChart/dashboardPieChart.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r) {
        var l = o.hexToRGB(a.colors.defaultText, .2),
            c = {
                day: parseInt(r.dateFilter.value)
            };

        function d() {
            $(".chart").each((function() {
                var e = $(this);
                e.easyPieChart({
                    easing: "easeOutBounce",
                    onStep: function(e, t, a) {
                        $(this.el).find(".percent").text(Math.round(a))
                    },
                    barColor: e.attr("rel"),
                    trackColor: "rgba(0,0,0,0)",
                    size: 84,
                    scaleLength: 0,
                    animation: 2e3,
                    lineWidth: 9,
                    lineCap: "round"
                })
            })), $(".refresh-data").on("click", (function() {
                var e;
                $(".pie-charts .chart").each((function(t, a) {
                    $(a).data("easyPieChart").update(e)
                }))
            }))
        }
        r.$watch("dateFilter.value", (function(t) {
            ! function() {
                e.charts = [];
                var t, a, o, r = [],
                    d = n.service("GET", i.getActiveUsersURL, c, {}).then((function(e) {
                        t = e
                    }));
                r.push(d);
                var m = n.service("GET", i.getActiveTasksURL, c, {}).then((function(e) {
                    o = e
                }));
                r.push(m), s.all(r).then((function() {
                    e.charts.push({
                        color: l,
                        description: "DASHBOARD_PIECHART_ACTIVEUSER",
                        stats: t.count,
                        icon: "person",
                        percent: t.rate
                    }), e.charts.push({
                        color: l,
                        description: "DASHBOARD_PIECHART_CRITICALTASK",
                        stats: o.count,
                        icon: "task",
                        percent: o.rate
                    })
                }))
            }()
        })), t((function() {
            d()
        }), 1e3)
    }
    e.$inject = ["$scope", "$timeout", "baConfig", "baUtil", "serviceImplementation", "dashboardURLs", "$q", "$rootScope"], angular.module("BlurAdmin.pages.dashboard").controller("DashboardPieChartCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("dashboardTodo", (function() {
        return {
            restrict: "EA",
            controller: "DashboardTodoCtrl",
            templateUrl: "app/pages/dashboard/dashboardTodo/dashboardTodo.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        e.transparent = t.theme.blur;
        var a = t.colors.dashboard,
            o = [];
        for (var n in a) o.push(a[n]);

        function i() {
            var e = Math.floor(Math.random() * (o.length - 1));
            return o[e]
        }
        e.todoList = [{
            text: "Check me out"
        }, {
            text: "Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro"
        }, {
            text: "Ex has semper alterum, expetenda dignissim"
        }, {
            text: "Vim an eius ocurreret abhorreant, id nam aeque persius ornatus."
        }, {
            text: "Simul erroribus ad usu"
        }, {
            text: "Ei cum solet appareat, ex est graeci mediocritatem"
        }, {
            text: "Get in touch with akveo team"
        }, {
            text: "Write email to business cat"
        }, {
            text: "Have fun with blur admin"
        }, {
            text: "What do you think?"
        }], e.todoList.forEach((function(e) {
            e.color = i()
        })), e.newTodoText = "", e.addToDoItem = function(t, a) {
            (a || 13 === t.which) && (e.todoList.unshift({
                text: e.newTodoText,
                color: i()
            }), e.newTodoText = "")
        }
    }
    e.$inject = ["$scope", "baConfig"], angular.module("BlurAdmin.pages.dashboard").controller("DashboardTodoCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").service("dashboardPieChart", (function() {}))
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("trafficChart", (function() {
        return {
            restrict: "E",
            controller: "TrafficChartCtrl",
            templateUrl: "app/pages/dashboard/trafficChart/trafficChart.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o, n) {
        e.transparent = t.theme.blur;
        var i = [];
        console.log(t.colors.dashboard), angular.forEach(t.colors.dashboard, (function(e, t) {
            this.push(e)
        }), i), e.rate = [], e.name = [], e.count = [], e.backgroundColor = [], e.hoverBackgroundColor = [];
        var s = "",
            r = 0;
        e.doughnutData = {
            datasets: [{}]
        }, e.doughnutData.labels = [], e.doughnutData.datasets[0].data = [], e.doughnutData.datasets[0].percentage = [], e.doughnutData.datasets[0].backgroundColor = [], e.doughnutData.datasets[0].hoverBackgroundColor = [], n.service("GET", o.getAcviteFormsAndCountsURL, {}).then((function(t) {
            for (var o = 0; o < t.length; o++) e.name.push(t[o].name), e.count.push(t[o].count), e.rate.push(t[o].rate), r == i.length && (r = 0), s = i[r], e.backgroundColor.push(s), e.hoverBackgroundColor.push(a.shade(s, 15)), r++;
            e.doughnutData.labels = e.name, e.doughnutData.datasets[0].data = e.count, e.doughnutData.datasets[0].percentage = e.rate, e.doughnutData.datasets[0].backgroundColor = e.backgroundColor, e.doughnutData.datasets[0].hoverBackgroundColor = e.hoverBackgroundColor;
            var n = document.getElementById("chart-area").getContext("2d");
            window.myDoughnut = new Chart(n, {
                type: "doughnut",
                data: e.doughnutData,
                options: {
                    cutoutPercentage: 64,
                    responsive: !0,
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    }
                }
            })
        }))
    }
    e.$inject = ["$scope", "baConfig", "colorHelper", "dashboardURLs", "serviceImplementation"], angular.module("BlurAdmin.pages.dashboard").controller("TrafficChartCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.dashboard").directive("weather", (function() {
        return {
            restrict: "EA",
            controller: "WeatherCtrl",
            templateUrl: "app/pages/dashboard/weather/weather.html"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o) {
        function n(e) {
            AmCharts.makeChart("tempChart", {
                type: "serial",
                theme: "blur",
                handDrawn: !0,
                categoryField: "time",
                dataProvider: e,
                valueAxes: [{
                    axisAlpha: .3,
                    gridAlpha: 0
                }],
                graphs: [{
                    bullet: "square",
                    fillAlphas: .3,
                    fillColorsField: "lineColor",
                    legendValueText: "[[value]]",
                    lineColorField: "lineColor",
                    title: "Temp",
                    valueField: "temp"
                }],
                categoryAxis: {
                    gridAlpha: 0,
                    axisAlpha: .3
                }
            }).write("tempChart")
        }
        e.units = "metric", e.weatherIcons = {
            "01d": "ion-ios-sunny-outline",
            "02d": "ion-ios-partlysunny-outline",
            "03d": "ion-ios-cloud-outline",
            "04d": "ion-ios-cloud",
            "09d": "ion-ios-rainy",
            "10d": "ion-ios-rainy-outline",
            "11d": "ion-ios-thunderstorm-outline",
            "13d": "ion-ios-snowy",
            "50d": "ion-ios-cloudy-outline",
            "01n": "ion-ios-cloudy-night-outline",
            "02n": "ion-ios-cloudy-night",
            "03n": "ion-ios-cloud-outline",
            "04n": "ion-ios-cloud",
            "09n": "ion-ios-rainy",
            "10n": "ion-ios-rainy-outline",
            "11n": "ion-ios-thunderstorm",
            "13n": "ion-ios-snowy",
            "50n": "ion-ios-cloudy-outline"
        }, e.weather = {}, e.switchUnits = function(t) {
            e.units = t, e.updateWeather()
        }, e.switchDay = function(t) {
            e.weather.current = t, n(e.weather.days[e.weather.current].timeTemp)
        }, e.updateWeather = function() {
            t({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/forecast",
                params: {
                    appid: "",
                    lat: e.geoData.geoplugin_latitude,
                    lon: e.geoData.geoplugin_longitude,
                    units: e.units
                }
            }).then((function(t) {
                var a, i, s;
                a = t.data, i = a.list[0], s = {
                    days: [{
                        date: new Date,
                        timeTemp: [],
                        main: i.weather[0].main,
                        description: i.weather[0].description,
                        icon: i.weather[0].icon,
                        temp: i.main.temp
                    }],
                    current: 0
                }, a.list.forEach((function(e, t) {
                    var o = new Date(e.dt_txt);
                    o.getDate() !== s.days[s.days.length - 1].date.getDate() && s.days.push({
                        date: o,
                        timeTemp: []
                    });
                    var n = s.days[s.days.length - 1];
                    n.timeTemp.push({
                        time: o.getHours(),
                        temp: e.main.temp
                    }), (s.days.length > 1 && 15 == o.getHours() || t == a.list.length - 1) && (n.main = e.weather[0].main, n.description = e.weather[0].description, n.icon = e.weather[0].icon, n.temp = e.main.temp, n.date.setHours(t == a.list.length - 1 ? 0 : 15), n.date.setMinutes(0))
                })), console.log(s.days[s.current].date), s.days = s.days.slice(0, o.attr("forecast") || 5), e.weather = s, n(e.weather.days[e.weather.current].timeTemp)
            }), (function() {
                console.log("WEATHER FAILED")
            }))
        }, t.jsonp("http://www.geoplugin.net/json.gp?jsoncallback=JSON_CALLBACK").then((function(t) {
            e.geoData = t.data, e.updateWeather()
        }), (function() {
            console.log("GEO FAILED")
        }))
    }
    e.$inject = ["$scope", "$http", "$timeout", "$element"], angular.module("BlurAdmin.pages.dashboard").controller("WeatherCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        function r(e, t, a) {
            for (var o = 0, n = e.length; o < n; o++)
                if (e[o][a] === t) return o;
            return -1
        }

        function l() {
            console.log("in reset function.."), e.selectedA = [], e.selectedB = [], e.togglea = !1, e.toggleb = !1
        }
        e.allUsers = [], e.allApplications = [], e.selectedApp = {}, e.selectedA = [], e.selectedB = [], e.listA = [], e.listB = [], e.items = [], e.checkedA = !1, e.checkedB = !1, e.checkValue = {}, e.lastItemInB = [], e.togglea = !1, e.toggleb = !1, e.makeSelectable = !0, a.service("GET", i.getUsersURL, {}).then((function(t) {
            console.log("getUsersURL on success..", t);
            for (var a = 0; a < t.length; a++) e.allUsers.push(t[a]);
            e.listA = t, e.items = t, console.log("in getUsersURL all users: ", e.allUsers)
        }), (function(e) {})), a.service("GET", i.getAllApplicationsURL, {}).then((function(t) {
            console.log("getAllApplicationsURL on success.."), e.allApplications = t, e.defaultValue = "ASSIGNUSERTOAPPLICATION_NOSELECTION", console.log("in getAllApplicationsURL all apps: ", e.allApplications)
        }), (function(e) {})), e.aToB = function() {
            for (var t = 0; t < e.selectedA.length; t++) {
                console.log("$scope.selectedA in aToB: ", e.selectedA[t]);
                var a = r(e.items, e.selectedA[t], "id");
                e.listB.push(e.items[a]);
                var o = r(e.listA, e.selectedA[t], "id");
                e.listA.splice(o, 1)
            }
            console.log("listb in aToB: ", e.listB), l()
        }, e.bToA = function() {
            for (var t = 0; t < e.selectedB.length; t++) {
                console.log("$scope.selectedA in bToA: ", e.selectedB[t]);
                var a = r(e.items, e.selectedB[t], "id");
                e.listA.push(e.items[a]);
                var o = r(e.listB, e.selectedB[t], "id");
                e.listB.splice(o, 1), 0 == e.listB.length ? e.lastItemInB = e.items[a] : e.lastItemInB = []
            }
            console.log("lista in bToA: ", e.listA), l()
        }, e.toggleA = function() {
            if (e.selectedA.length > 0) e.selectedA = [];
            else
                for (var t = 0; t < e.listA.length; t++) e.selectedA.push(e.listA[t].id)
        }, e.toggleB = function() {
            if (e.selectedB.length > 0) e.selectedB = [];
            else
                for (var t = 0; t < e.listB.length; t++) e.selectedB.push(e.listB[t].id)
        }, e.selectA = function(t) {
            1 == e.togglea ? (e.selectedA = [], e.togglea = !1) : (e.selectedA.push(t), console.log("pushed a id: " + t))
        }, e.selectB = function(t) {
            1 == e.toggleb ? (e.selectedB = [], e.toggleb = !1) : (e.selectedB.push(t), console.log("pushed b id: " + t))
        }, e.getAssignedUsersForSelectedApp = function(t) {
            if (e.selectedApp.id = t, e.makeSelectable = null == t, t > 0) {
                e.listB = [], e.listA = angular.copy(e.allUsers);
                var o = t;
                a.service("POST", i.getAssignedUserApplicationsURL, {}, o).then((function(t) {
                    t.length > 0 && (e.listB = t, e.listA = e.listA.filter((function(e) {
                        for (var a in t)
                            if (e.id === t[a].id) return !1;
                        return !0
                    })))
                }), (function(e) {}))
            }
        }, e.saveNewUserApplication = function(t) {
            var r = {};
            e.dataList = [], e.dataList = e.listB, r.data = e.dataList, r.applicationId = e.selectedApp.id, r.userName = s.get("username"), a.service("POST", i.sendUserNewApplication, {}, r).then((function(e) {
                o.success(n("translate")("ASSIGNUSERTOAPPLICATION_ADDSUCCESSMESSAGE"), "")
            }), (function() {
                o.error(n("translate")("ASSIGNUSERTOAPPLICATION_ADDERRORMESSAGE"), "")
            }))
        }
    }
    e.$inject = ["$scope", "$rootScope", "serviceImplementation", "toastr", "$filter", "assignApplicationURL", "$cookies"], angular.module("BlurAdmin.pages.form-management").controller("assignApplicationCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.form-management").directive("selectpicker", (function() {
        return {
            restrict: "A",
            require: "?ngOptions",
            priority: 1500,
            link: {
                pre: function(e, t, a) {
                    t.append('<option data-hidden="true" disabled value="">' + (a.title || "Select something") + "</option>")
                },
                post: function(e, t, a) {
                    function o() {
                        t.selectpicker("refresh")
                    }
                    a.ngModel && e.$watch(a.ngModel, o), a.ngDisabled && e.$watch(a.ngDisabled, o), t.selectpicker({
                        dropupAuto: !1,
                        hideDisabled: !0
                    })
                }
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a) {
        function o() {
            a.close(), t.isImageUploaded = !1, t.fileName = ""
        }
        e.imageDescription = "", e.onSaveDetailCameraInformation = function() {
            var a = {
                name: t.fileName,
                description: e.imageDescription
            };
            void 0 === t.formData[e.cameraComponent.shortName] ? (t.formData[e.cameraComponent.shortName] = [], t.formData[e.cameraComponent.shortName].push(a)) : t.formData[e.cameraComponent.shortName].push(a), e.checkRequiredValidationOfCamera(e.cameraComponent.shortName), o()
        }, e.onCloseModal = function() {
            o()
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance"], angular.module("BlurAdmin.pages.forms").controller("detailCameraModalCTRL", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.forms").controller("informationModalCTRL", (function() {
        document.getElementsByTagName("img")[0].style.height = "auto", document.getElementsByTagName("img")[0].style.width = "100%", document.getElementsByTagName("img")[0].style.maxWidth = "100%"
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.datasource = {
            name: "",
            type: -1,
            endpoint: ""
        }, e.validDataSource = !1, e.displayedAllDataSources = [], e.pagination = {}, e.isSuccess = !1, e.isError = !1, e.isSearchFilterExist = !1, e.searchVariables = {}, e.maxSize = 25, e.bigTotalItems = "", e.pagination.itemPerPage = 25, e.pagination.bigCurrentPage = 1, e.isTableSearched = !1;
        var r = {};
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getDataSources = function() {
            var o;
            1 == e.pagination.bigCurrentPage ? r.offset = 0 : r.offset = (e.pagination.bigCurrentPage - 1) * e.pagination.itemPerPage, e.isTableSearched || (r.filterRequest = [], r.filterRequest.push({
                fieldName: "status",
                value: "0"
            })), r.order = e.orderKeyword, r.limit = e.pagination.itemPerPage, o = r, console.log("Parameter:", o), t.service("POST", a.getAllDatasource, {}, o).then((function(t) {
                e.bigTotalItems = t.totalSize, e.numPages = e.bigTotalItems / e.pagination.itemPerPage, angular.copy(t.objList, e.displayedAllDataSources)
            }))
        }, e.getDataSources(), e.removeDataSource = function(i, r) {
            var l = {};
            l.data = i, l.userName = n.get("username"), t.service("POST", a.saveDataSource, {}, l).then((function() {
                s.success(o("translate")("DATASOURCE_REMOVE_SUCCESSMESSAGE"), ""), e.displayedAllDataSources.splice(r, 1)
            }), (function() {
                s.error(o("translate")("DATASOURCE_REMOVE_ERRORMESSAGE"), "")
            }))
        }, e.changeRowsOnPage = function() {
            e.bigCurrentPage = 1, e.getDataSources()
        }, e.deleteFilter = function() {
            e.searchVariables.name = "", e.isTableSearched = !1, e.bigCurrentPage = 1, e.isSearchFilterExist && (e.isSearchFilterExist = !1, e.getDataSources())
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getDataSources()
        }, e.search = function() {
            e.isTableSearched = !0, e.isSearchFilterExist = !1, (r = {}).filterRequest = [], "" != e.searchVariables.name && void 0 !== e.searchVariables.name && (r.filterRequest.push({
                fieldName: "name",
                value: e.searchVariables.name
            }), e.isSearchFilterExist = !0), r.filterRequest.push({
                fieldName: "status",
                value: "0"
            }), e.bigCurrentPage = 1, e.isSearchFilterExist && e.getDataSources()
        }, e.addList = function() {
            if ("" != e.datasource.name && -1 != e.datasource.type && "" != e.datasource.endpoint) {
                e.isError = !1;
                var i = {};
                e.datasource.id = null, i.data = e.datasource, i.userName = n.get("username"), t.service("POST", a.saveDataSource, {}, i).then((function(t) {
                    e.validDataSource = !1, s.success(o("translate")("DATASOURCE_ADD_SUCCESSMESSAGE"), "");
                    var a = {};
                    (a = e.datasource).id = t, e.displayedAllDataSources.push(a)
                }), (function() {
                    s.error(o("translate")("DATASOURCE_ADD_ERRORMESSAGE"), "")
                }))
            } else e.isError = !0, e.errorMessage = o("translate")("DATASOURCE_ERROR_EMPTY_FIELD")
        }, e.validate = function() {
            if ("" != e.datasource.name && -1 != e.datasource.type && "" != e.datasource.endpoint) {
                var n = {};
                n.type = e.datasource.type, n.endPoint = e.datasource.endpoint, t.service("POST", a.validateURI, {}, n).then((function(t) {
                    e.isSuccess = !0, e.isError = !1, e.successMessage = o("translate")("DATASOURCE_SUCCESS_VERIFIED"), e.validDataSource = !0
                }), (function(t) {
                    e.validDataSource = !1, e.isError = !0, e.isSuccess = !1, "110" == t.data ? e.errorMessage = o("translate")("DATASOURCE_ERROR_ILLEAGALURI") : "109" == t.data ? e.errorMessage = o("translate")("DATASOURCE_ERROR_TIMEOUT_UNREACHABLE") : "102" == t.data ? e.errorMessage = o("translate")("DATASOURCE_ERROR_SOME_ERROR_OCCURED") : "111" == t.data && (e.errorMessage = o("translate")("DATASOURCE_ERROR_UNVERIFIED"))
                }))
            } else e.isError = !0, e.errorMessage = o("translate")("DATASOURCE_ERROR_EMPTY_FIELD")
        }, e.setButton = function() {
            e.validDataSource = !1
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "dataSourceURLs", "$filter", "$cookies", "$rootScope", "toastr"], angular.module("BlurAdmin.pages.more").controller("dataSourceCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r) {
        var l = "http://licence.invisoapp.com.tr";
        e.isDeviceAdded = !1;
        var c = n.get("username");
        e.allDisplayedDevices = [], e.isError = !1, e.errorMessage = "", e.device = {
            id: -1,
            deviceUUID: "",
            createdBy: c
        }, e.isSearchFilterExist = !1, e.pagination = {}, e.searchVariables = {}, e.maxSize = 5, e.bigTotalItems = "", e.pagination.itemPerPage = 5, e.pagination.bigCurrentPage = 1, e.isTableSearched = !1;
        var d = {};
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getAllCompanyDevices = function() {
            var o, n = {
                fieldName: "backendAddress",
                value: location.hostname
            };
            1 == e.pagination.bigCurrentPage ? d.offset = 0 : d.offset = (e.pagination.bigCurrentPage - 1) * e.pagination.itemPerPage, e.isTableSearched || (d.filterRequest = [], d.filterRequest.push({
                fieldName: "status",
                value: "0"
            }), d.filterRequest.push(n)), d.order = e.orderKeyword, d.limit = e.pagination.itemPerPage, o = d, console.log("Parameter:", o), t.serviceWithoutToken("POST", a.getCompanyDevicesURL, {}, o, l).then((function(t) {
                console.log("all company devices: ", t), e.bigTotalItems = t.totalSize, e.numPages = e.bigTotalItems / e.pagination.itemPerPage, angular.copy(t.objList, e.allDisplayedDevices)
            }))
        }, e.getAllCompanyDevices(), e.addDevice = function() {
            if ("" == e.device.deviceUUID || null == e.device.deviceUUID) e.isError = !0, e.errorMessage = o("translate")("DEVICE_UUIDREQUIRED");
            else if (e.isdeviceUUIDExist(e.device.deviceUUID)) e.device = {}, s.error(o("translate")("DEVICE_DEVICEALREADYADDED"), "");
            else {
                e.isDeviceAdded = !0;
                var n = {};
                n.dockerName = location.hostname, n.data = e.device, console.log("Parameter:", n), t.serviceWithoutToken("POST", a.saveCompanyDeviceURL, {}, n, l).then((function(t) {
                    e.isDeviceAdded = !1, -2 != t ? (console.log("saved device id: ", t), e.device.id = t, e.allDisplayedDevices.push(e.device), s.success(o("translate")("DEVICE_ADD_SUCCESSMESSAGE"), "")) : (console.log("max num of licenced devices..."), s.error(o("translate")("DEVICE_MAXNUMBERWARN"), "")), e.device = {}, e.isError = !1
                }), (function() {
                    s.error(o("translate")("DEVICE_ADD_ERRORMESSAGE"), "")
                }))
            }
        }, e.isdeviceUUIDExist = function(t) {
            for (var a = 0; a < e.allDisplayedDevices.length; a++)
                if (e.allDisplayedDevices[a].deviceUUID == t) return !0;
            return !1
        }, e.deleteDevice = function(n, i) {
            var r;
            r = n, t.serviceWithoutToken("POST", a.deleteCompanyDeviceURL, {}, r, l).then((function() {
                console.log("successfully deleted..."), e.allDisplayedDevices.splice(i, 1), s.success(o("translate")("DEVICE_DELETE_SUCCESSMESSAGE"), "")
            }), (function() {
                s.error(o("translate")("DEVICE_DELETE_ERRORMESSAGE"), "")
            }))
        }, e.deleteFilter = function() {
            e.searchVariables.uuid = "", e.isTableSearched = !1, e.bigCurrentPage = 1, e.isSearchFilterExist && (e.isSearchFilterExist = !1, e.getAllCompanyDevices())
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getAllCompanyDevices()
        }, e.search = function() {
            e.isTableSearched = !0, e.isSearchFilterExist = !1, (d = {}).filterRequest = [], "" != e.searchVariables.uuid && void 0 !== e.searchVariables.uuid && (d.filterRequest.push({
                fieldName: "deviceUUID",
                value: e.searchVariables.uuid
            }), e.isSearchFilterExist = !0), d.filterRequest.push({
                fieldName: "status",
                value: "0"
            }), e.bigCurrentPage = 1, e.isSearchFilterExist && e.getAllCompanyDevices()
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "deviceURLs", "$filter", "$cookies", "$rootScope", "toastr", "connectionConfigURL"], angular.module("BlurAdmin.pages.more").controller("deviceCtrl", e)
}(),
function(e) {
    "use strict";

    function t(t) {
        var a = t("filter");
        return function(t, o) {
            return a(t, o, (function(t, a) {
                var o, n, i, s, r = a.before,
                    l = a.after,
                    c = a.lower,
                    d = a.higher;
                if (e.isObject(a)) {
                    if (a.before || a.after) try {
                        return !(r && (o = a.before, new Date(t) > new Date(o))) && !(l && (n = a.after, new Date(t) < new Date(n)))
                    } catch (e) {
                        return !1
                    } else if (c || d) return !(c && t > (o = a.lower)) && !(d && t < (n = a.higher));
                    return !0
                }
                return i = t, s = ("" + (s = a)).toLowerCase(), ("" + i).toLowerCase().indexOf(s) > -1
            }))
        }
    }
    t.$inject = ["$filter"], angular.module("BlurAdmin.pages.more").filter("customFilter", t)
}(angular),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.displayedAllLogs = [], e.logVariables = {}, e.pagination = {}, s.changePreLoaderColor(), i.isStatusSet ? e.isLoading = !1 : e.isLoading = !0, e.maxSize = 5, e.bigTotalItems = "", e.pagination.itemPerPage = 5, e.pagination.bigCurrentPage = 1, e.isTableSearched = !1;
        var r = {};

        function l() {
            var t = new Date;
            return void 0 !== e.logVariables.endDate && (t = new Date(e.logVariables.endDate.getTime())), t.setDate(t.getDate() - 365), t
        }
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getLogList = function() {
            var n;
            1 == e.pagination.bigCurrentPage ? r.offset = 0 : r.offset = (e.pagination.bigCurrentPage - 1) * e.pagination.itemPerPage, r.order = e.orderKeyword, r.limit = e.pagination.itemPerPage, e.isTableSearched || (r.filterRequest = [], r.filterRequest.push({
                fieldName: "type",
                value: "0"
            })), n = r, t.service("POST", a.getLogsURL, {}, n).then((function(t) {
                e.isLoading = !1, e.bigTotalItems = t.totalSize, e.numPages = e.bigTotalItems / e.pagination.itemPerPage;
                for (var a = 0; a < t.objList.length; a++) t.objList[a].timestamp = o("date")(t.objList[a].timestamp, "dd-MM-yyyy HH:mm:ss");
                angular.copy(t.objList, e.displayedAllLogs)
            }), (function() {
                e.isLoading = !1
            }))
        }, e.getLogList(), t.service("GET", a.getAllApplicationsURL, {}).then((function(t) {
            e.allApplications = t
        })), e.allEnvironments = [{
            name: "Android"
        }], e.allLevels = [{
            name: "ANALYTICS",
            id: 1
        }, {
            name: "FATAL",
            id: 2
        }, {
            name: "ERROR",
            id: 3
        }, {
            name: "WARN",
            id: 4
        }, {
            name: "INFO",
            id: 5
        }, {
            name: "LOG",
            id: 6
        }, {
            name: "DEBUG",
            id: 7
        }, {
            name: "TRACE",
            id: 8
        }], e.changeRowsOnPage = function() {
            e.pagination.bigCurrentPage = 1, e.getLogList()
        }, e.deleteFilter = function() {
            e.logVariables.application = "", e.logVariables.message = "", e.logVariables.environment = "", e.logVariables.level = "", e.logVariables.deviceID = "", e.logVariables.startDate = "", e.logVariables.endDate = "", e.isTableSearched = !1, e.pagination.bigCurrentPage = 1, e.getLogList()
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getLogList()
        }, e.search = function() {
            e.isTableSearched = !0;
            var t = null,
                a = null,
                n = !1,
                i = !1;
            if ((r = {}).filterRequest = [], "" != e.logVariables.application && void 0 !== e.logVariables.application && r.filterRequest.push({
                    fieldName: "application",
                    value: e.logVariables.application
                }), "" != e.logVariables.message && void 0 !== e.logVariables.message && r.filterRequest.push({
                    fieldName: "message",
                    value: e.logVariables.message
                }), "" != e.logVariables.environment && void 0 !== e.logVariables.environment && r.filterRequest.push({
                    fieldName: "environment",
                    value: e.logVariables.environment
                }), "" != e.logVariables.level && void 0 !== e.logVariables.level && r.filterRequest.push({
                    fieldName: "level",
                    value: e.logVariables.level
                }), "" != e.logVariables.deviceID && void 0 !== e.logVariables.deviceID && r.filterRequest.push({
                    fieldName: "deviceId",
                    value: e.logVariables.deviceID
                }), "" != e.logVariables.startDate && void 0 !== e.logVariables.startDate && (t = o("date")(e.logVariables.startDate, "yyyy-MM-dd HH:mm:ss"), n = !0), "" != e.logVariables.endDate && void 0 !== e.logVariables.endDate && (a = o("date")(e.logVariables.endDate, "yyyy-MM-dd HH:mm:ss"), i = !0), i || n) {
                var s = t + "&_&" + a;
                r.filterRequest.push({
                    fieldName: "startDate",
                    value: s
                })
            }
            r.filterRequest.push({
                fieldName: "type",
                value: "0"
            }), e.getLogList()
        }, e.inlineOptions = {
            customClass: function(t) {
                var a = t.date;
                if ("day" === t.mode)
                    for (var n = o("date")(a, "dd-MM-yyyy "), i = 0; i < e.events.length; i++) {
                        var s = o("date")(e.events[i].date, "dd-MM-yyyy ");
                        if (n === s) return e.events[i].status
                    }
                return ""
            },
            showWeeks: !0
        }, e.startDateOptions = {
            formatYear: "yy",
            minDate: l(),
            maxDate: e.logVariables.endDate || new Date,
            startingDay: 1
        }, e.endDateOptions = {
            formatYear: "yy",
            maxDate: new Date,
            startingDay: 1
        }, e.checkEndDateModal = function() {
            null != e.logVariables.endDate && null != e.logVariables.startDate && ((e.logVariables.endDate.getTime() - e.logVariables.startDate.getTime()) / 864e5 > 365 && (e.logVariables.startDate = l()))
        }, e.open1 = function() {
            e.startDateOptions = {
                formatYear: "yy",
                minDate: l(),
                maxDate: e.logVariables.endDate || new Date,
                startingDay: 1
            }, e.popup1.opened = !0
        }, e.open2 = function() {
            e.endDateOptions = {
                formatYear: "yy",
                startingDay: 1,
                minDate: e.logVariables.startDate > e.logVariables.endDate ? e.logVariables.endDate : e.logVariables.startDate,
                maxDate: new Date
            }, e.popup2.opened = !0
        }, e.formats = ["dd-MMMM-yyyy", "dd-MM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], e.format = e.formats[1], e.altInputFormats = ["M!/d!/yyyy"], e.popup1 = {
            opened: !1
        }, e.popup2 = {
            opened: !1
        };
        var c = new Date;
        c.setDate(c.getDate() + 1);
        var d = new Date;
        d.setDate(c.getDate() + 1), e.events = [{
            date: c,
            status: "full"
        }, {
            date: d,
            status: "partially"
        }]
    }
    e.$inject = ["$scope", "serviceImplementation", "listLogURLs", "$filter", "$cookies", "$rootScope", "Core"], angular.module("BlurAdmin.pages.more").controller("listLogCtrl", e)
}(),
function(e) {
    "use strict";

    function t(t) {
        return {
            restrict: "E",
            require: "^stTable",
            scope: {
                before: "=",
                after: "="
            },
            templateUrl: "app/pages/list-logs/stDateRange.html",
            link: function(t, a, o, n) {
                var i = a.find("input"),
                    s = e.element(i[0]),
                    r = e.element(i[1]),
                    l = o.predicate;

                function c(e) {
                    return function(a) {
                        a.preventDefault(), a.stopPropagation(), e ? t.isBeforeOpen = !0 : t.isAfterOpen = !0
                    }
                } [s, r].forEach((function(e) {
                    e.bind("blur", (function() {
                        var e = {};
                        t.isBeforeOpen || t.isAfterOpen || (t.before && (e.before = t.before), t.after && (e.after = t.after), t.$apply((function() {
                            n.search(e, l)
                        })))
                    }))
                })), t.openBefore = c(!0), t.openAfter = c()
            }
        }
    }
    t.$inject = ["$timeout"], angular.module("BlurAdmin.pages.more").directive("stDateRange", t)
}(angular),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        e.isLoading = !1, e.options = {
            dialogsInBody: !0,
            height: 300,
            toolbar: [
                ["edit", ["undo", "redo"]],
                ["headline", ["style"]],
                ["font", ["italic", "bold", "underline", "superscript", "subscript", "strikethrough", "clear"]],
                ["fontface", ["fontname"]],
                ["textsize", ["fontsize"]],
                ["fontclr", ["color"]],
                ["alignment", ["ul", "ol", "paragraph", "lineheight"]],
                ["height", ["height"]],
                ["insert", ["picture", "hr"]],
                ["view", ["fullscreen", "codeview"]]
            ]
        }, e.imageUpload = function(o, l, d) {
            console.log("image upload:", o);
            var p = {};
            p.type = c.INFO_PICTURES, p.applicationId = i.currentApp.id, (new FormData).append("file", o);
            var m = s.get("imagePath") + "/";
            console.log("File", o), t.uploadService(o[0], a.uploadURL, p).then((function(returnedFileName) {
                var t = document.createElement("img");
                t.src = m + returnedFileName, t.height = "60", e.editor.summernote("insertNode", t)
            }), (function(e) {
                n.error(r("translate")("UPLOAD_ERROR_MESSAGE"), "")
            }))
        }, e.goBack = function() {
            void 0 !== i.componentOption.component.options[0].key && (i.isEditorSaved = !1), console.log(i.componentOption.component.options[0].key), i.componentOption.component.options[0].key.length < 1e5 ? i.currentTpl = "app/pages/palette/palette.html" : n.error(r("translate")("CHARACTER_LIMITATION_ERRORMESSAGE"), "")
        }, e.openGalleryModal = function() {
            e.isLoading = !0, e.images = [], e.selectedImages = {};
            var n = {};
            n.applicationId = i.currentApp.id, n.type = c.INFO_PICTURES, t.service("POST", a.getUsersApplicationURL, {}, n).then((function(t) {
                e.isLoading = !1;
                for (var a = 0; a < t.length; a++) e.images.push(t[a].fileName);
                o.open({
                    animation: !1,
                    controller: "galleryModalCtrl",
                    scope: e,
                    templateUrl: "app/pages/palette/galleryModal/galleryModal.html"
                })
            }))
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "paletteURL", "$uibModal", "toastr", "$rootScope", "$cookies", "$filter", "$timeout", "documentType"], angular.module("BlurAdmin.pages.form-management").controller("AddContentToInfoComponentCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r) {
        if (e.eventOptions = {}, e.eventOptions.functions = [], e.isSavedEventShowed = !1, e.functionType = {}, t.selectedFunctions = [], e.eventName = "", e.isChanged = !1, t.eventFunctionTypes = [], t.allPages = [], t.allPages = t.currentApp.pages, e.page = {}, e.showNavigationPages = !1, e.functionInformation = {}, void 0 !== e.functionType.id && e.setFunctions(), e.filterEvent = function(a) {
                var o = [];
                if (t.isEventForNavigation) {
                    e.eventOptions.id = 1;
                    for (var n = 0; n < t.allEventTypes.length; n++) 1 != t.allEventTypes[n].id && o.push(t.allEventTypes[n].id)
                } else if (e.isSavedEventShowed)
                    for (n = 0; n < t.componentEvents.events.length; n++) e.selectedEventId != t.componentEvents.events[n].id && o.push(t.componentEvents.events[n].id);
                else
                    for (n = 0; n < t.componentEvents.events.length; n++) o.push(t.componentEvents.events[n].id);
                return -1 === o.indexOf(a.id)
            }, e.checkValidityOfEvent = function() {
                return !e.eventOptions.hasOwnProperty("id") || (t.isEventForNavigation ? !!angular.equals(e.eventOptions.functions, {}) : 0 == e.eventOptions.functions.length)
            }, e.controlIsFunctionExist = function(a) {
                for (var o = !1, n = 0; n < t.allFunctions.length; n++) {
                    t.allFunctions[n].functionDetail.split('"')[1] == a && (o = !0, e.eventOptions.functions = t.allFunctions[n])
                }
                return o
            }, e.saveNavigationFunction = function() {
                e.functionInformation.functionDetail = '$state.go("' + e.page.shortName + '");', e.functionInformation.description = "Navigation_" + Date.now();
                var a = {};
                a.data = e.functionInformation, a.userName = n.get("username"), a.applicationId = t.currentApp.id, i.service("POST", s.saveFunctionsURL, {}, a).then((function(a) {
                    e.functionInformation.id = a, e.eventOptions.functions = angular.copy(e.functionInformation), e.functionInformation = {}, t.allFunctions.push(e.eventOptions.functions), e.setSavedFunctionVariables()
                }))
            }, e.setSaveButtonDisabled = function() {
                e.isChanged = !0
            }, e.setFunctions = function() {
                e.isChanged = !1, t.selectedFunctions = [], e.isSavedEventShowed && !t.isEventForNavigation || (e.eventOptions.functions = []), "3" == e.functionType.id ? e.showNavigationPages = !0 : e.showNavigationPages = !1, t.selectedFunctions = r.setSelectedFunctions(t.allFunctions, e.functionType.id)
            }, t.isEventForNavigation)
            if (t.eventFunctionTypes = t.functionTypes, angular.equals(t.navigationTab.functions, {})) e.isSavedEventShowed = !1;
            else {
                if (e.isSavedEventShowed = !0, e.functionType = t.navigationTab.functions.functionType, 3 == e.functionType.id) {
                    var l = t.navigationTab.functions.functionDetail.split('"');
                    e.page.shortName = l[1]
                }
                e.setFunctions(), e.eventOptions.functions = t.navigationTab.functions
            }
        else
            for (var c = 0; c < t.functionTypes.length; c++) 3 != t.functionTypes[c].id && t.eventFunctionTypes.push(t.functionTypes[c]);
        e.showSelectedEvent = function(t, a) {
            e.functionType = t.functions[0].functionType, e.selectedEventId = t.id, e.setFunctions(), e.selectedEventIndex = a, e.eventOptions = t, e.isSavedEventShowed = !0
        }, e.setSavedFunctionVariables = function() {
            t.navigationTab.functions = {}, t.navigationTab.functions = e.eventOptions.functions
        }, e.saveEvent = function() {
            t.isEditorSaved = !1;
            for (var n = 0; n < t.allEventTypes.length; n++) e.eventOptions.id == t.allEventTypes[n].id && (e.eventOptions.type = t.allEventTypes[n].type, e.eventOptions.description = t.allEventTypes[n].description);
            for (n = 0; n < t.functionTypes.length; n++) 3 == t.functionTypes[n].id && (e.functionInformation.functionType = t.functionTypes[n]);
            e.isSavedEventShowed ? t.isEventForNavigation ? 3 == e.functionType.id ? e.controlIsFunctionExist(e.page.shortName) ? e.setSavedFunctionVariables() : e.saveNavigationFunction() : t.navigationTab.functions = e.eventOptions.functions : (t.componentEvents.events[e.selectedEventIndex] = e.eventOptions, e.eventOptions = {}, e.isSavedEventShowed = !1) : t.isEventForNavigation ? (3 == e.functionType.id ? e.controlIsFunctionExist(e.page.shortName) ? e.setSavedFunctionVariables() : e.saveNavigationFunction() : e.setSavedFunctionVariables(), e.isSavedEventShowed = !0, a.success(o("translate")("PALETTE_ADDNAVIGATIONTABTOFUNCTION_SUCCESSMESSAGE"), "")) : (t.componentEvents.events.push(e.eventOptions), e.eventOptions = {}, e.functionType = {}, e.isSavedEventShowed = !1), e.isChanged = !1
        }, e.clear = function() {
            e.eventOptions = {}, e.functionType = {}, e.isSavedEventShowed = !1
        }, e.goBackToPalette = function() {
            t.currentTpl = "app/pages/palette/palette.html"
        }, e.deleteEvent = function(a) {
            t.isEditorSaved = !1, t.componentEvents.events.splice(a, 1), e.isSavedEventShowed = !1, e.eventOptions = {}, e.functionType = {}
        }, e.deleteNavigationTabFunction = function() {
            t.isEditorSaved = !1, t.navigationTab.functions = {}, e.functionType = {}, e.eventOptions = {}, e.isSavedEventShowed = !1
        }
    }
    e.$inject = ["$scope", "$rootScope", "toastr", "$filter", "$cookies", "serviceImplementation", "paletteURL", "Core"], angular.module("BlurAdmin.pages.form-management").controller("AddEventCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l) {
        e.functionInformation = {}, e.isSavedFunctionShowed = !1, e.showPageNavigationSelect = !1, e.functionName = "", t.isNavigationFunction = !1, e.filterFunction = function(e) {
            if ("" != e) {
                for (var a = [], o = 0; o < t.allFunctions.length; o++) 1 != t.allFunctions[o].functionType.id && 3 != t.allFunctions[o].functionType.id || a.push(t.allFunctions[o].functionType.id);
                return -1 === a.indexOf(e.functionType.id)
            }
        }, e.showHidePageNavigation = function() {
            e.showPageNavigationSelect = !e.showPageNavigationSelect
        }, e.checkValidityOfFunction = function() {
            if (e.functionForm.description.$invalid || e.functionForm.functionDetail.$invalid) return !0
        }, e.deleteFunction = function(a) {
            e.functionId = a, t.deleteOperation = "function";
            var o = s("translate")("CONFIRMDELETE_MESSAGE"),
                n = {
                    animation: !1,
                    controller: "ConfirmDeleteModalCtrl",
                    scope: e,
                    templateUrl: "app/modal/confirmDeleteModal.html"
                };
            l.openConfirmModal(n, o)
        }, e.setSelectedFunction = function(a) {
            t.allPages = [], e.isSavedFunctionShowed = !0, e.functionInformation = a
        }, e.clearFunctionInformation = function() {
            e.functionInformation = {}, e.isSavedFunctionShowed = !1, t.isNavigationFunction = !1
        }, e.saveFunction = function() {
            for (var r = 0; r < t.functionTypes.length; r++) 2 == t.functionTypes[r].id && (e.functionInformation.functionType = t.functionTypes[r]);
            if (e.functionInformation.functionDetail.length < 1e4)
                if (e.isSavedFunctionShowed) {
                    var c = {};
                    (d = {}).data = e.functionInformation, d.userName = n.get("username"), a.service("POST", o.updateFunctionURL, c, d).then((function() {
                        i.success(s("translate")("UPDATEFUNCTION_SUCCESSMESSAGE"), ""), e.isSavedFunctionShowed = !1, e.functionInformation = {}
                    }), (function() {
                        i.error(s("translate")("UPDATEFUNCTION_ERRORMESSAGE"), "")
                    }))
                } else {
                    console.log(e.functionInformation);
                    var d;
                    c = {};
                    (d = {}).data = e.functionInformation, d.userName = n.get("username"), d.applicationId = t.currentApp.id, a.service("POST", o.saveFunctionsURL, c, d).then((function(a) {
                        e.functionInformation.id = a, i.success(s("translate")("ADDFUNCTION_SUCCESSMESSAGE"), "");
                        var o;
                        o = angular.copy(e.functionInformation), t.allFunctions.push(o), t.selectedFunctions = l.setSelectedFunctions(t.allFunctions, e.functionType.id), e.functionInformation = {}
                    }), (function() {
                        i.error(s("translate")("ADDFUNCTION_ERRORMESSAGE"), "")
                    }))
                }
            else i.error(s("translate")("CHARACTER_LIMITATION_ERRORMESSAGE"), "")
        }, e.setDisabled = function() {
            return !!t.isNavigationFunction
        }
    }
    e.$inject = ["$scope", "$rootScope", "serviceImplementation", "paletteURL", "$cookies", "toastr", "$filter", "$uibModal", "Core"], angular.module("BlurAdmin.pages.form-management").controller("AddFunctionCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        e.goBackToPalette = function() {
            t.currentTpl = "app/pages/palette/palette.html"
        }
    }
    e.$inject = ["$scope", "$rootScope"], angular.module("BlurAdmin.pages.form-management").controller("AddTextContentCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l) {
        e.closeAndSave = function() {
            var e = {};
            e.data = t.currentApp, e.userName = r.get("username");
            for (var c = !1, d = !0, p = 0; p < t.currentApp.pages.length; p++) {
                t.currentApp.pages[p].homePage && (c = !0);
                for (var m = 0; m < t.currentApp.pages[p].navigations.length; m++) angular.equals(t.currentApp.pages[p].navigations[m].functions, {}) && (d = !1)
            }
            c && t.uniqueCount > 0 && d ? n.service("POST", i.saveStructureURL, {}, e).then((function(e) {
                t.isEditorSaved = !0;
                for (var a = 0; a < t.applications.length; a++) t.applications[a].id == e && (t.applications[a] = t.currentApp);
                s.success(l("translate")("PALETTE_SAVESUCCESSMESSAGE"), ""), void 0 !== t.toStateName && "formManagement.indexPalette" != t.toStateName && o.go(t.toStateName);
                r.get("username")
            }), (function() {
                s.error(l("translate")("PALETTE_SAVEERRORMESSAGE"), "")
            })) : (c || s.error(l("translate")("PALETTE_MUSTPICKHOMEPAGE") + l("translate")("PALETTE_APPLICATIONSAVEDERROR"), ""), t.uniqueCount < 1 && s.error(l("translate")("PALETTE_MUSTPICKUNIQUEID") + l("translate")("PALETTE_APPLICATIONSAVEDERROR"), ""), d || s.error(l("translate")("PALETTE_MUSTADDNAVIGATIONFUNCTION") + l("translate")("PALETTE_APPLICATIONSAVEDERROR"), "")), a.close()
        }, e.closeWithoutSave = function() {
            a.close(), void 0 !== t.toStateName && "formManagement.indexPalette" != t.toStateName && o.go(t.toStateName)
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "$state", "serviceImplementation", "paletteURL", "toastr", "$cookies", "$filter"], angular.module("BlurAdmin.pages.form-management").controller("ConfirmBeforeClosingTheEditorCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        e.yes = function() {
            if ("form" == t.deleteOperation) {
                t.isEditorSaved = !1;
                for (var d = 0; d < e.currentPage.forms[e.selectedFormIndex].rows.length; d++)
                    for (var p = 0; p < e.currentPage.forms[e.selectedFormIndex].rows[d].components.length; p++) n.deleteUniqueComponent(e.currentPage.forms[e.selectedFormIndex].rows[d].components[p]);
                e.currentPage.forms.splice(e.selectedFormIndex, 1), e.properties.template = ""
            }
            if ("page" == t.deleteOperation) {
                var m = 0;
                t.currentApp.pages.length > 1 && -1 != e.selectedIndex && (m = 1);
                for (var u = t.currentApp.pages[e.selectedPageIndex + m], g = 0; g < u.forms.length; g++)
                    for (d = 0; d < u.forms[g].rows.length; d++)
                        for (p = 0; p < u.forms[g].rows[d].components.length; p++) n.deleteUniqueComponent(u.forms[g].rows[d].components[p]);
                t.currentApp.pages.splice(e.selectedPageIndex + m, 1), e.properties.template = ""
            }
            if ("app" == t.deleteOperation) {
                var E = {};
                console.log("Current app shortName:", t.currentApp.shortName), E.shortName = t.currentApp.shortName, E.userName = o.get("username"), i.service("POST", s.deleteApplicationURL, {}, E).then((function() {
                    t.applications.splice(t.indexOfSelectedApp, 1), r.success(l("translate")("CONFIRMBEFORECLOSINGTHEADITOR_APPSUCCESSDELETE"), ""), a.close(), t.showAppInformation = !1
                }), (function() {
                    r.error(l("translate")("CONFIRMBEFORECLOSINGTHEADITOR_APPFAILDELETE"), ""), a.close()
                }))
            }
            if ("component" == t.deleteOperation) {
                t.isEditorSaved = !1;
                var T = e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components[e.selectedColumnIndex];
                n.deleteUniqueComponent(T), e.deletedComponent = e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components[e.selectedColumnIndex], e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components[e.selectedColumnIndex] = n.createNewComponent(e.deletedComponent.colNumber, e.deletedComponent.rowNumber), e.properties.template = "", e.entity.name = ""
            }
            if ("row" == t.deleteOperation) {
                t.isEditorSaved = !1;
                var f = e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex];
                for (d = 0; d < f.components.length; d++) n.deleteUniqueComponent(f.components[d]);
                e.currentPage.forms[e.selectedFormIndex].rows.splice(e.selectedRowIndex, 1), e.properties.template = ""
            }
            if ("column" == t.deleteOperation) {
                t.isEditorSaved = !1;
                var A = e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components[e.selectedColumnIndex];
                n.deleteUniqueComponent(A), e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components.splice(e.selectedColumnIndex, 1), e.properties.template = "", 0 == e.currentPage.forms[e.selectedFormIndex].rows[e.selectedRowIndex].components.length && e.currentPage.forms[e.selectedFormIndex].rows.splice(e.selectedRowIndex, 1), e.isColumnSelected = !1
            }
            if ("tabItem" == t.deleteOperation && (t.isEditorSaved = !1, e.currentPage.navigations.splice(e.deletedTabIndex, 1), 0 == e.currentPage.navigations.length ? (e.properties.template = "", e.entity.name = "") : e.properties.template = e.propertiesUrl.tab), "navigationTab" == t.deleteOperation && (e.currentPage.navigations = [], e.properties.template = "", e.entity.name = ""), "optionTab" == t.deleteOperation && (t.isEditorSaved = !1, e.componentOptions.component.options.splice(e.deletedOptionIndex + 1, 1), e.properties.template = e.propertiesUrl[e.componentOptions.component.type]), "function" == t.deleteOperation) {
                var v = t.allFunctions.findIndex((function(t, a) {
                    return t.id === e.functionId
                }));
                (E = {}).functionId = e.functionId, E.userName = o.get("username"), i.service("POST", s.deleteFunctionURL, {}, E).then((function() {
                    t.allFunctions.splice(v, 1), r.success(l("translate")("PALETTE_ADDFUNCTION_DELETESUCCESSFULLY"), ""), t.selectedFunctions = c.setSelectedFunctions(t.allFunctions, e.functionType.id)
                }), (function() {
                    r.error(l("translate")("PALETTE_ADDFUNCTION_DELETEERROR"), "")
                }))
            }
            a.close()
        }, e.no = function() {
            a.close()
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "$cookies", "paletteService", "serviceImplementation", "paletteURL", "toastr", "$filter", "Core"], angular.module("BlurAdmin.pages.form-management").controller("ConfirmDeleteModalCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l) {
        e.yes = function() {
            var o = {
                    id: "",
                    name: "datasource",
                    key: "",
                    orderNumber: "2",
                    type: "Datasource",
                    optionTypeId: ""
                },
                i = !1;
            if (e.componentDataSourceOption.component.datasourceType)
                for (s = 0; s < e.componentDataSourceOption.component.options.length; s++) "Option" == e.componentDataSourceOption.component.options[s].type ? e.componentDataSourceOption.component.options.splice(s, 1) : "Datasource" == e.componentDataSourceOption.component.options[s].type && (i = !0);
            else
                for (var s = 0; s < e.componentDataSourceOption.component.options.length; s++) "Datasource" == e.componentDataSourceOption.component.options[s].type && e.componentDataSourceOption.component.options.splice(s, 1);
            i || t.allEndpoints.length > 0 && (o.key = t.allEndpoints[0].id, n.setComponentOptionsId(o), e.componentDataSourceOption.component.options.push(o)), a.close()
        }, e.no = function() {
            e.componentOptions.component.datasourceType = Boolean(e.selectedDataSourceType), a.close()
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "$cookies", "paletteService", "serviceImplementation", "paletteURL", "toastr", "$filter"], angular.module("BlurAdmin.pages.form-management").controller("confirmForDataSourceModalCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.imagePath = i.get("imagePath") + "/", console.log("Images name", e.images), e.addPicturesToEditor = function() {
            var t = i.get("imagePath") + "/";
            angular.forEach(e.selectedImages, (function(a, o) {
                if (1 == a) {
                    var n = document.createElement("img");
                    n.src = t + e.images[o], n.height = "60", e.editor.summernote("insertNode", n)
                }
            })), a.close()
        }, e.showFullScreenImage = function(t) {
            e.imageSrc = t, console.log("Src:" + t), s.open({
                animation: !1,
                scope: e,
                templateUrl: "app/pages/palette/full-screen-image-modal/full-screen-image-modal.html"
            })
        }, e.controlIsImagesChecked = function() {
            var t = !0;
            return !!angular.equals(e.selectedImages, {}) || (angular.forEach(e.selectedImages, (function(e, a) {
                t = !!e
            })), !t)
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "serviceImplementation", "paletteURL", "$cookies", "$uibModal"], angular.module("BlurAdmin.pages.form-management").controller("galleryModalCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        e.newApp = {
            name: "",
            description: "",
            formType: ""
        }, e.selectedApp = {}, e.buttonClicked = !1, e.allApplications = {}, e.showFormSection = !1, e.newApp.formType = 0, e.showHideFormSection = function() {
            e.showFormSection = !e.showFormSection
        }, e.getAllApplications = function() {
            o.service("POST", c.getApplicationNamesURL).then((function(t) {
                e.allApplications = t, e.selectedApp.value = e.allApplications[0]
            }), (function() {
                console.log("An error occured while all applications are getting.")
            }))
        }, e.getAllApplications(), e.onCreateApplication = function() {
            e.newApp.name.length < 1e4 && e.newApp.description.length < 1e4 ? function() {
                e.buttonClicked = !0, a.close(), e.isLoading = !0, e.applicationInformation = {}, e.applicationInformation.name = e.newApp.name, e.applicationInformation.description = e.newApp.description, e.applicationInformation.formType = e.newApp.formType, e.applicationInformation.shortName = l.getShortName("App"), console.log("Before sending service , app information: ", e.applicationInformation);
                var c = {};
                c.data = e.applicationInformation, c.userName = s.get("username"), o.service("POST", n.newApplicationURL, {}, c).then((function(a) {
                    if (console.log("Return app value form service: ", a), e.showFormSection) {
                        console.log("User selected the existing application.");
                        var l = {};
                        l.applicationId = Number(e.selectedApp.value), o.service("POST", n.getStructureURL, {}, l).then((function(l) {
                            var c = {};
                            a.pages = l[0].pages, c.data = a, c.userName = s.get("username"), o.service("POST", n.saveStructureURL, {}, c).then((function() {
                                console.log("Application is saved with selected application pages.:New app with selected application:", a), i.success(r("translate")("NEWAPPMODAL_APPSUCCESS"), ""), t.applications.push(a), console.log("All applications in application page:", t.applications);
                                var o = t.applications.length - 1;
                                t.isApplicationCreated = !0, console.log("After created", a), t.currentApp = a, e.openSelectedApp(o, a.id)
                            }), (function() {
                                i.error(r("translate")("NEWAPPMODAL_APPFAIL"), "")
                            }))
                        }))
                    } else {
                        console.log("User didn't select existing form.Creating new one."), t.applications.push(a), i.success(r("translate")("NEWAPPMODAL_APPSUCCESS"), ""), console.log("All applications in application page :", t.applications);
                        var c = t.applications.length - 1;
                        t.isApplicationCreated = !0, t.currentApp = a, e.openSelectedApp(c, a.id)
                    }
                }), (function() {
                    i.error(r("translate")("NEWAPPMODAL_APPFAIL"), "")
                }))
            }() : i.error(r("translate")("CHARACTER_LIMITATION_ERRORMESSAGE_APPLICATION_NAME_DESCRIPTION"), "")
        }, e.controlFormElement = function() {
            return void 0 === e.newApp.name || "" == e.newApp.name
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "serviceImplementation", "paletteURL", "toastr", "$cookies", "$filter", "paletteService", "ReportServiceURLs"], angular.module("BlurAdmin.pages.form-management").controller("NewApplicationModalCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o) {
        e.pageTitle = "", e.ok = function() {
            a.close(), t.isEditorSaved = !1;
            var n = o.createNewPage(e.pageTitle);
            "" == n.title && (n.title = "-"), n.homePage = !1, t.currentApp.pages.push(n);
            for (var i = 0; i < t.currentApp.pages.length; i++) {
                t.currentApp.pages[i].homePage && (e.isHomePageSelectedBefore[n.shortName] = !0)
            }
        }, e.closeModal = function() {
            a.close()
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "paletteService"], angular.module("BlurAdmin.pages.form-management").controller("NewPageModalCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n) {
        e.isSavedValidationShowed = !1, e.validation = {}, e.selectedValidationId = "", e.selectedValidationIndex = "", e.showValueProperties = !0, e.showRegexTestSpan = !1, e.showRegexTestForm = !1, e.isRegexChecked = !1, e.match = !1, e.validationTest = {}, e.filterValidation = function(a) {
            var o = [];
            if ("CheckBox" == e.componentType || "MultiSelectBox" == e.componentType ? (o.push(3), o.push(4), o.push(7), o.push(8), o.push(9), o.push(10)) : "RadioButton" == e.componentType || "SelectBox" == e.componentType ? (o.push(3), o.push(4), o.push(5), o.push(6), o.push(7), o.push(8), o.push(10)) : "Signature" == e.componentType ? (o.push(1), o.push(3), o.push(4), o.push(5), o.push(6), o.push(7), o.push(8), o.push(9), o.push(10)) : "BarcodeReader" == e.componentType ? (o.push(5), o.push(6), o.push(7), o.push(8), o.push(9), o.push(10)) : "Camera" == e.componentType || "DetailCamera" == e.componentType ? (o.push(1), o.push(2), o.push(3), o.push(4), o.push(5), o.push(6), o.push(7), o.push(8), o.push(9)) : "TextArea" == e.componentType ? (o.push(5), o.push(6), o.push(7), o.push(8), o.push(9), o.push(10)) : e.selectedValidationType == t.validationType.VALIDATION ? (o.push(5), o.push(6), o.push(9), o.push(10)) : (o.push(1), o.push(2), o.push(3), o.push(4), o.push(5), o.push(6), o.push(9), o.push(10)), e.isSavedValidationShowed)
                for (var n = 0; n < e.componentValidations.validations.length; n++) e.selectedValidationId != e.componentValidations.validations[n].id && o.push(e.componentValidations.validations[n].id);
            else
                for (n = 0; n < e.componentValidations.validations.length; n++) o.push(e.componentValidations.validations[n].id);
            return -1 === o.indexOf(a.id)
        }, e.changeValueProperties = function() {
            "2" == e.validation.id || "10" == e.validation.id ? (e.showValueProperties = !1, e.showRegexTestSpan = !1, e.showRegexTestForm = !1) : "1" == e.validation.id ? e.showRegexTestSpan = !0 : (e.showRegexTestSpan = !1, e.showRegexTestForm = !1, e.showValueProperties = !0)
        }, e.checkRegularExpression = function() {
            var t = new RegExp(e.validationTest.regular).test(e.validationTest.string);
            e.isRegexChecked = !0, e.match = t, e.validationTest.result = t ? o("translate")("VALIDATION_MODAL_TEST_TRUE_RESULT") : o("translate")("VALIDATION_MODAL_TEST_FALSE_RESULT")
        }, e.checkTestVariableValue = function() {
            return void 0 === e.validationTest.regular || "unefined" == typeof e.validationTest.string || ("" == e.validationTest.regular || "" == e.validationTest.string)
        }, e.openTestForm = function() {
            e.showRegexTestForm = !e.showRegexTestForm
        }, e.isEmpty = function() {
            return "" == e.res
        }, e.showSelectedValidation = function(t, a) {
            e.selectedValidationId = t.id, e.selectedValidationIndex = a, e.validation = t, e.changeValueProperties(), e.isSavedValidationShowed = !0
        }, e.deleteValidation = function(a) {
            t.isEditorSaved = !1, e.componentValidations.validations.splice(a, 1), e.isSavedValidationShowed = !1, e.validation = {}
        }, e.clear = function() {
            e.validation = {}, e.isSavedValidationShowed = !1, e.isRegexChecked = !1, e.showRegexTestSpan = !1, e.showRegexTestForm = !1
        }, e.saveValidation = function() {
            if (e.validation.errorMessage.length < 1e4) {
                t.isEditorSaved = !1, "2" != e.validation.id && "10" != e.validation.id || (e.validation.value = "true");
                for (var a = 0; a < t.allValidationTypes.length; a++) e.validation.id == t.allValidationTypes[a].id && (e.validation.name = t.allValidationTypes[a].name);
                e.validation.type = e.selectedValidationType, e.isSavedValidationShowed ? (e.componentValidations.validations[e.selectedValidationIndex] = e.validation, e.isSavedValidationShowed = !1) : e.componentValidations.validations.push(e.validation), e.validation = {}
            } else n.error(o("translate")("CHARACTER_LIMITATION_ERRORMESSAGE"), "")
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "$filter", "toastr"], angular.module("BlurAdmin.pages.form-management").controller("AddValidationCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d, p) {
        e.hoveringAppName = !1, e.application = {
            name: ""
        }, e.isSearchFilterExist = !1, e.isSortDownClicked = !0, e.isSortUpClicked = !1, e.orderKeyword = "DESC", e.applications = {}, e.sort = function(t) {
            e.orderKeyword = t, console.log("$scope.orderKeyword: " + e.orderKeyword), e.search(), "ASC" == t ? (e.isSortDownClicked = !1, e.isSortUpClicked = !0) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1)
        }, e.maxSize = 5, e.bigTotalItems = "", e.itemPerPage = 5, e.currentPage = {
            number: 1
        }, e.isTableSearched = !1;
        var m = {};
        e.getAppNames = function() {
            var a;
            1 == e.currentPage.number ? m.offset = 0 : m.offset = (e.currentPage.number - 1) * e.itemPerPage, m.order = e.orderKeyword, m.limit = e.itemPerPage, e.isTableSearched || (m.filterRequest = [], m.filterRequest.push({
                fieldName: "status",
                value: 0
            })), a = m, t.service("POST", c.getExportableApplicationNamesURL, {}, a).then((function(t) {
                e.isLoading = !1, e.bigTotalItems = t.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.itemPerPage), e.applications = t.objList
            }), (function(e) {
                i.error(l("translate")("APPLICATIONPAGE_APPGETERROR"), "")
            }))
        }, e.getAppNames(), e.search = function() {
            console.log("app name in search function: " + e.application.name), e.isTableSearched = !0, e.isSearchFilterExist = !1, (m = {}).filterRequest = [], "" != e.application.name && void 0 !== e.application.name && e.application.name.length > 2 && (m.filterRequest.push({
                fieldName: "name",
                value: e.application.name
            }), e.isSearchFilterExist = !0), e.currentPage.number = 1, m.filterRequest.push({
                fieldName: "status",
                value: 0
            }), e.getAppNames()
        }, e.downloadLastExportAppData = function(e) {
            var t = p + c.downloadFormDataURL + "?appName=" + e + "&token=" + s.get("token");
            window.open(t)
        }, e.downloadLastExportExcel = function() {
            var e = p + c.downloadFormDataExcelURL + "?token=" + s.get("token");
            window.open(e)
        }, e.exportAppData = function(e, a) {
            var o = {
                appName: e
            };
            t.service("POST", c.exportFormDataURL, o, {}).then((function(e) {
                console.log(e)
            }), (function(e) {})), i.success("İşleminiz bittiğinde mail ile bilgilendirileceksiniz veya daha sonra bu sayfa üzerinden raporunuzu indirebilirsiniz!", "")
        }, e.exportAppDataExcel = function() {
            t.service("POST", c.exportFormDataExcelURL, {}, {}).then((function(e) {
                console.log(e)
            }), (function(e) {})), i.success("İşleminiz bittiğinde mail ile bilgilendirileceksiniz veya daha sonra bu sayfa üzerinden raporunuzu indirebilirsiniz!", "")
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "Core", "dataSourceURLs", "paletteURL", "toastr", "$cookies", "$timeout", "$filter", "ReportServiceURLs", "$window", "connectionConfigURL"], angular.module("BlurAdmin.pages.report").controller("formDataExportCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        e.yes = function() {
            a.close()
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance"], angular.module("BlurAdmin.pages.report").controller("ConfirmDocumentUpdateModalCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a) {
        e.yes = function() {
            a.selectedIndexTab--, t.close()
        }, e.no = function() {
            t.close()
        }
    }
    e.$inject = ["$scope", "$uibModalInstance", "$rootScope"], angular.module("BlurAdmin.pages.report").controller("confirmGoBackReportPageModalController", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l) {
        e.yes = function() {
            a.close(), console.log(" $scope.reportRows ", t.reportRows);
            var e = {};
            e.data = t.reportRows, e.userName = o.get("username"), e.applicationId = parseInt(t.selectedApp.content.value), e.documentId = t.lastSelectedRow.id, n.service("POST", l.saveReportURL, {}, e).then((function() {
                i.success(s("translate")("REPORTDESIGN_REPORTSAVESUCCESS"), ""), console.log(" report is successfully saved.")
            }), (function(e) {
                i.error(s("translate")("REPORTDESIGN_REPORTSAVEFAIL"), "")
            }))
        }, e.no = function() {
            a.close()
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance", "$cookies", "serviceImplementation", "toastr", "$filter", "ReportDesignService", "ReportServiceURLs"], angular.module("BlurAdmin.pages.report").controller("ConfirmSaveModalCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l) {
        e.allApplications = [], i.service("POST", s.getApplicationNamesURL).then((function(t) {
            e.allApplications = t, console.log("reportDesignCTRL getApplicationNamesURL on success")
        }), (function(e) {})), t.selectedApp = {}, e.disableNextButton = !0, t.templateList = [], e.max = 2, t.selectedIndexTab = 0, e.nextTab = function() {
            var a = t.selectedIndexTab == e.max ? 0 : t.selectedIndexTab + 1;
            t.selectedIndexTab = a
        }, e.checkIfSelected = function(t) {
            console.log("checkIfSelected-selectedApp: ", t), null != t && (e.disableNextButton = !1)
        }, e.continueWithApp = function() {
            console.log("$rootScope.selectedApp ", t.selectedApp);
            var e = parseInt(t.selectedApp.content.value);
            console.log("getApplicationDocumentsURL params: ", e), i.service("POST", s.getApplicationDocumentsURL, {}, e).then((function(e) {
                console.log("getApplicationDocuments on success.."), t.templateList = e;
                for (var a = 0; a < t.templateList.length; a++) t.templateList[a].disabled = !0
            }), (function(e) {})), t.selectedIndexTab++
        }
    }
    e.$inject = ["$scope", "$rootScope", "ReportDesignService", "$cookies", "toastr", "serviceImplementation", "ReportServiceURLs", "$filter", "$timeout"], angular.module("BlurAdmin.pages.report").controller("reportDesignCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            getApplications: function() {
                var a = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/adminReporter/getStructure",
                    params: {
                        userName: "nisazeynep"
                    }
                }).then((function(e) {
                    var t = e.data;
                    a.resolve(t)
                }), (function(e) {
                    a.reject(e)
                })), a.promise
            },
            saveReport: function(a, o, n, i) {
                var s = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/report/saveReport",
                    params: {
                        data: a,
                        userName: o,
                        applicationId: n,
                        documentId: i
                    }
                }).then((function(e) {
                    var t = e.data;
                    s.resolve(t)
                }), (function(e) {
                    s.reject(e)
                })), s.promise
            },
            uploadFileToUrl: function(a, o) {
                var n = t.defer(),
                    i = new FormData;
                return i.append("file", a), e.post(o, i, {
                    transformRequest: angular.identity,
                    headers: {
                        "Content-Type": void 0,
                        Accept: "text/plain"
                    }
                }).success((function(e) {
                    var t = e.data;
                    n.resolve(t), console.log("File upload is successful.")
                })).error((function(e) {
                    n.reject(e), console.log("File upload is failed.")
                })), n.promise
            },
            getTemplateParams: function(a) {
                var o = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/report/templateParams",
                    params: {
                        templateName: a
                    }
                }).then((function(e) {
                    var t = e.data;
                    o.resolve(t)
                }), (function(e) {
                    o.reject(e)
                })), o.promise
            },
            getAllTemplates: function() {
                var a = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/report/getAllTemplates"
                }).then((function(e) {
                    var t = e.data;
                    a.resolve(t)
                }), (function(e) {
                    a.reject(e)
                })), a.promise
            },
            updateTemplate: function(a) {
                var o = t.defer();
                return e({
                    method: "POST",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/report/updateTemplate",
                    params: {
                        id: a
                    }
                }).then((function(e) {
                    var t = e.data;
                    o.resolve(t)
                }), (function(e) {
                    o.reject(e)
                })), o.promise
            },
            getSavedTemplateId: function(a) {
                var o = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/getSavedDocument",
                    params: {
                        fileName: a
                    }
                }).then((function(e) {
                    var t = e.data;
                    o.resolve(t)
                }), (function(e) {
                    o.reject(e)
                })), o.promise
            },
            getApplicationDocuments: function(a) {
                var o = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/report/getApplicationDocuments",
                    params: {
                        applicationId: a
                    }
                }).then((function(e) {
                    var t = e.data;
                    o.resolve(t)
                }), (function(e) {
                    o.reject(e)
                })), o.promise
            },
            getApplicationReportParameters: function(a, o) {
                var n = t.defer();
                return e({
                    method: "GET",
                    url: connectionConfig.url + ":" + connectionConfig.port + "/mfc/report/getApplicationReportParameters",
                    params: {
                        applicationId: a,
                        documentId: o
                    }
                }).then((function(e) {
                    var t = e.data;
                    n.resolve(t)
                }), (function(e) {
                    n.reject(e)
                })), n.promise
            }
        }
    }
    e.$inject = ["$http", "$q"], angular.module("BlurAdmin.pages.report").factory("ReportDesignService", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        e.disableNextButton = !0, e.disableRemoveButton = !0, t.lastSelectedRow = {}, e.currentRow = {}, t.templateParamList = [], t.selectedAppStructure = {}, console.log("$rootScope.templateList.length " + t.templateList.length), e.goToPreviousTab = function() {
            e.disableNextButton = !0, e.disableRemoveButton = !0, t.templateList = [], t.selectedIndexTab--
        }, e.newRow = function() {
            e.inserted = {
                fileName: "",
                addDoc: "",
                url: "",
                selected: !1,
                disabled: !1
            }, t.templateList.unshift(e.inserted)
        }, e.removeRow = function(a) {
            if (1 == a.selected) {
                var o = t.templateList.indexOf(a);
                if (console.log("removeRow indexOfTemplate is: " + o), a.id) {
                    var n = {};
                    n.documentId = a.id, n.applicationId = parseInt(t.selectedApp.content.value), i.service("POST", s.deleteReportTemplateURL, {}, n).then((function(a) {
                        t.templateList.splice(o, 1), console.log("deleteReportTemplateURL in Success"), e.disableRemoveButton = !0, e.disableNextButton = !0
                    }), (function(e) {}))
                } else t.templateList.splice(o, 1), e.disableRemoveButton = !0, e.disableNextButton = !0
            }
        }, e.updateRow = function(a) {
            if (c.open({
                    animation: !1,
                    controller: "ConfirmDocumentUpdateModalCTRL",
                    scope: e,
                    templateUrl: "app/pages/report/report-design/confirmDocumentUpdateModal.html"
                }), 1 == a.selected) {
                var o = t.templateList.indexOf(a);
                console.log("removeRow indexOfTemplate is: " + o), e.disableRemoveButton = !1, e.disableNextButton = !0, a.disabled = !1
            }
        }, e.uploadFile = function(r, c) {
            console.log("document id : " + c), (new FormData).append("file", d);
            var d = t.fileread;
            console.log("file is in next line"), console.dir(d);
            var p = d.name.split("."),
                m = p[p.length - 1];
            if (console.log("extension ", m), "docx" != m && "doc" != m && "odt" != m) return alert(l("translate")("REPORTDESIGN_FILEFORMATERROR")), !1;
            for (var u = !1, g = 0; g < t.templateList.length; g++)
                if (g != r && t.templateList[g].fileName == d.name) {
                    u = !0;
                    break
                } if (u) return alert(l("translate")("REPORTDESIGN_ADDSAMEFILEERROR")), !1;
            var E = {};
            E.applicationId = parseInt(t.selectedApp.content.value), E.documentId = null != c ? c : "", console.log("ReportServiceURLs.uploadURL param", E), i.uploadService(d, s.uploadURL, E).then((function() {
                var c = {};
                c.fileName = d.name, c.applicationId = parseInt(t.selectedApp.content.value), i.service("POST", s.getSavedTemplateIdURL, {}, c).then((function(i) {
                    t.templateList[r].id = i, t.templateList[r].url = a + s.fileURL + "?fileName=" + d.name + "&token=" + o.get("token"), t.templateList[r].fileName = d.name, t.fileread = {}, e.disableNextButton = !1, n.success(l("translate")("REPORTDESIGN_UPLOADFILESUCCESS"), "")
                }), (function(e) {}))
            }), (function(t) {
                n.error(l("translate")("REPORTDESIGN_UPLOADFILEWARNING"), ""), e.disableNextButton = !0
            }))
        }, e.getFile = function(e) {
            var t = {};
            t.fileName = e, i.getFile("POST", s.getSelectedFileURL, {}, t).then((function(e) {
                document.selectedFileName = e, console.log("getSelectedFile on success..");
                var t = document.createElement("a");
                t.setAttribute("href", s.fileURL + "&fileName=" + document.selectedFileName + "&token=" + o.get("token")), t.setAttribute("download", document.selectedFileName), t.setAttribute("target", "_blank"), t.click()
            }), (function(e) {}))
        }, e.selectedRow = function(a) {
            console.log("selected row index" + a), e.currentRow = e.templateList[a];
            for (var o = 0; o < e.templateList.length; o++)
                if (t.templateList[o].selected = !1, a == o) {
                    if (t.templateList[o].selected = !0, e.disableRemoveButton = !1, null != t.templateList[o].id) {
                        e.disableNextButton = !1, t.lastSelectedRow = t.templateList[o];
                        break
                    }
                } else t.templateList[o].selected = !1, e.disableNextButton = !0;
            console.log("selected row ", t.templateList)
        }, t.reportRows = [], e.continueWithSelectedTemplate = function() {
            if (console.log("disableNextButton: ", e.disableNextButton), null != t.lastSelectedRow.id) {
                t.isStatusSet ? t.isLoadingInReportPage = !1 : (r.changePreLoaderColor(), t.isLoadingInReportPage = !0);
                var a = {};
                (o = {}).applicationId = parseInt(t.selectedApp.content.value), o.documentId = t.lastSelectedRow.id, i.service("POST", s.getApplicationReportParametersURL, a, o).then((function(e) {
                    console.log("getApplicationReportParameters success.."), t.reportRows = e;
                    for (var a = 0; a < t.reportRows.length; a++) t.reportRows[a].valid = !0;
                    var o;
                    o = t.lastSelectedRow.fileName, i.service("POST", s.getTemplateParamsURL, {}, o).then((function(e) {
                        console.log("getTemplateParams success.."), t.templateParamListFromService = e, t.selectedIndexTab++
                    }), (function(e) {}))
                }), (function(e) {}));
                var o;
                a = {};
                (o = {}).applicationId = parseInt(t.selectedApp.content.value), i.service("POST", s.getApplicationsURL, a, o).then((function(e) {
                    t.selectedAppStructure = e[0], t.isLoadingInReportPage = !1
                }), (function(e) {}))
            } else n.error(l("translate")("REPORTDESIGN_UPLOADFILEWARNING"), "")
        }
    }
    e.$inject = ["$scope", "$rootScope", "connectionConfigURL", "$cookies", "toastr", "serviceImplementation", "ReportServiceURLs", "Core", "$filter", "$uibModal"], angular.module("BlurAdmin.pages.report").controller("reportDesignTab2CTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        e.disableRowButton = !1, e.selectedIndex = 0, e.isParamsDisabled = !0, e.uncomittedRow = {}, e.selectParameter = function(t, a) {
            e.selectedRow = t, e.indexOfReportRow = a, r.open({
                animation: !1,
                controller: "parameterListModalCTRL",
                scope: e,
                templateUrl: "app/pages/report/report-design/parameterListModal/parameterListModal.html"
            })
        }, e.filterValidation = function(e) {
            return null != t.templateParamListFromService && -1 == t.templateParamListFromService.indexOf(e.key) && (e.key = l("translate")("REPORT_DESIGN_SELECT_PARAMETER")), e
        }, e.addNewRow = function() {
            console.log("$scope.disableRowButton: ", e.disableRowButton), console.log("test", t.selectedAppStructure), e.inserted = {
                key: l("translate")("REPORT_DESIGN_SELECT_PARAMETER"),
                value: "",
                option: "",
                valid: !0
            }, t.reportRows.unshift(e.inserted)
        }, e.isRowParamSelected = function(e) {
            return "" == e.key
        }, e.removeSelectedRow = function(e) {
            for (var a = 0, o = 0; o < t.reportRows.length; o++)
                if (e == t.reportRows[o].key) {
                    a = o;
                    break
                } t.reportRows.splice(a, 1)
        }, e.backButton = function() {
            var t = l("translate")("REPORT_GO_BACK_ERROR"),
                a = {
                    animation: !1,
                    controller: "confirmGoBackReportPageModalController",
                    scope: e,
                    templateUrl: "app/modal/confirmDeleteModal.html"
                };
            c.openConfirmModal(a, t)
        }, e.save = function() {
            var a = l("translate")("REPORT_DESIGN_SELECT_PARAMETER"),
                o = !0;
            if (t.reportRows.length > 0)
                for (var i = 0; i < t.reportRows.length; i++) "" != t.reportRows[i].key && "" != t.reportRows[i].value && t.reportRows[i].key != a || (o = !1, t.reportRows[i].valid = !1);
            else o = !1;
            o ? r.open({
                animation: !1,
                controller: "ConfirmSaveModalCtrl",
                scope: e,
                templateUrl: "app/pages/report/report-design/confirmSaveModal.html"
            }) : n.error(l("translate")("REPORT_LEAVE_BLANK_ERROR"), "")
        }, e.dragOver = function(e) {
            e.preventDefault()
        };
        var d = "";
        e.dropColumn = function(a) {
            var o = a.target.id;
            console.log("selectedRowIndex" + o), a.stopPropagation();
            var n = a.dataTransfer.getData("html"); - 1 == n.indexOf("_$_") ? e.$apply((function() {
                t.reportRows[a.target.id].value = n, t.reportRows[a.target.id].option = "-1j", "" != t.reportRows[a.target.id].key && (t.reportRows[a.target.id].valid = !0)
            })) : (d = n.split("_$_")[1], n.split("_$_")[0], e.$apply((function() {
                t.reportRows[a.target.id].option = d, t.reportRows[a.target.id].value = n, "" != t.reportRows[a.target.id].key && (t.reportRows[a.target.id].valid = !0)
            }))), console.log("data: " + n), e.dragData = n
        }, e.drag = function(e) {
            e.dataTransfer.setData("html", e.target.id)
        }, e.createHTMLForText = function(e) {
            return c.createHTMLForText(e)
        }
    }
    e.$inject = ["$scope", "$rootScope", "ReportDesignService", "$cookies", "toastr", "serviceImplementation", "ReportServiceURLs", "$uibModal", "$filter", "Core"], angular.module("BlurAdmin.pages.report").controller("reportDesignTab3CTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i) {
        e.yes = function() {
            var s;
            s = e.approvedAssignmentId, t.service("POST", a.approvedReportURL, {}, s).then((function() {
                e.getReports(), o.close(), n.success(i("translate")("REPORT_RESULT_SUCCESS_APPROVE_MESSAGE"), "")
            }), (function() {
                n.error(i("translate")("REPORT_RESULT_ERROR_APPROVE_MESSAGE"), ""), o.close()
            }))
        }, e.no = function() {
            o.close()
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "ReportServiceURLs", "$uibModalInstance", "toastr", "$filter"], angular.module("BlurAdmin.pages").controller("reportApprovedConfirmModalCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d, p, m) {
        var u;
        e.formData = {}, e.componentValues = {}, e.displayedAllReports = [], p.changePreLoaderColor(), e.isSearchFilterExist = !1, e.showParametersOfReports = [{
            name: "REPORT_PARAMETERS_ACTIVE",
            value: i.ACTIVE
        }], s.isFromReportResultPage || (s.reportVariables = {}), s.isStatusSet ? e.isLoading = !1 : e.isLoading = !0, s.isFromReportResultPage || (s.searchJSON = {}, s.pagination = {}, s.isTableSearched = !1, s.pagination.bigCurrentPage = 1, s.pagination.parameterOfReports = 0), e.maxSize = 5, e.bigTotalItems = "", e.pagination.itemPerPage = 5, e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getReports = function() {
            var n;
            s.isFromReportResultPage || (s.isTableSearched || (s.searchJSON.filterRequest = []), 1 == s.pagination.bigCurrentPage ? s.searchJSON.offset = 0 : s.searchJSON.offset = (s.pagination.bigCurrentPage - 1) * e.pagination.itemPerPage, s.searchJSON.order = e.orderKeyword, s.searchJSON.limit = e.pagination.itemPerPage), n = s.searchJSON, s.isFromReportResultPage = !1, console.log("Parameter:", n), t.service("POST", a.getReportsURL, {}, n).then((function(t) {
                e.bigTotalItems = t.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.pagination.itemPerPage), angular.copy(t.objList, e.displayedAllReports);
                for (var a = 0; a < t.objList.length; a++) t.objList[a].controlDate = o("date")(t.objList[a].controlDate, "dd-MM-yyyy"), t.objList[a].assignmentDate = o("date")(t.objList[a].assignmentDate, "dd-MM-yyyy");
                e.isLoading = !1
            }), (function() {
                e.isLoading = !1, c.error(o("translate")("REPORTRESULT_ERRORMESSAGE"), "")
            }))
        }, e.getReports(), e.changeRowsOnPage = function() {
            s.pagination.bigCurrentPage = 1, e.getReports()
        }, e.deleteFilter = function() {
            s.reportVariables.controlDate = "", s.reportVariables.assignmentDate = "", s.reportVariables.userName = "", s.reportVariables.applicationName = "", s.reportVariables.taskName = "", s.reportVariables.barcode = "", s.isTableSearched = !1, s.pagination.bigCurrentPage = 1, e.isSearchFilterExist && (e.isSearchFilterExist = !1, e.getReports())
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getReports()
        }, e.search = function() {
            if (s.isTableSearched = !0, e.isSearchFilterExist = !1, s.searchJSON = {}, s.searchJSON.filterRequest = [], "" != s.reportVariables.userName && void 0 !== s.reportVariables.userName && (s.searchJSON.filterRequest.push({
                    fieldName: "user.username",
                    value: s.reportVariables.userName
                }), e.isSearchFilterExist = !0), "" != s.reportVariables.applicationName && void 0 !== s.reportVariables.applicationName && (s.searchJSON.filterRequest.push({
                    fieldName: "applicationVersion.name",
                    value: s.reportVariables.applicationName
                }), e.isSearchFilterExist = !0), "" != s.reportVariables.taskName && void 0 !== s.reportVariables.taskName && (s.searchJSON.filterRequest.push({
                    fieldName: "taskName",
                    value: s.reportVariables.taskName
                }), e.isSearchFilterExist = !0), "" != s.reportVariables.barcode && void 0 !== s.reportVariables.barcode && (s.searchJSON.filterRequest.push({
                    fieldName: "barcode",
                    value: s.reportVariables.barcode
                }), e.isSearchFilterExist = !0), "" != s.reportVariables.assignmentDate && void 0 !== s.reportVariables.assignmentDate) {
                var t = o("date")(s.reportVariables.assignmentDate, "yyyy-MM-dd HH:mm:ss");
                s.searchJSON.filterRequest.push({
                    fieldName: "assignmentDate",
                    value: t
                }), e.isSearchFilterExist = !0
            }
            if ("" != s.reportVariables.controlDate && void 0 !== s.reportVariables.controlDate) {
                var a = o("date")(s.reportVariables.controlDate, "yyyy-MM-dd");
                s.searchJSON.filterRequest.push({
                    fieldName: "controlDate",
                    value: a
                }), e.isSearchFilterExist = !0
            }
            s.pagination.bigCurrentPage = 1, e.isSearchFilterExist && e.getReports()
        }, e.showFormData = function(o, i, version) {
            console.log(version);
            e.isLoading = !0, s.formData = {}, s.formData = JSON.parse(o), angular.forEach(s.formData, (function(e, t) {
                if (/(\d{2})-(\d{2})-(\d{4})/.test(e)) {
                    var a = e.split("-"),
                        o = a[2] + "-" + a[1] + "-" + a[0];
                    s.formData[t] = o
                } else try {
                    s.formData[t] = angular.fromJson(s.formData[t]), "number" == typeof s.formData[t] && (s.formData[t] = s.formData[t] + "")
                } catch (e) {
                    s.formData[t] = s.formData[t] + ""
                }
            })), console.log("Form Data:", s.formData);
            var r = {"applicationId":i, "version":version};
            t.service("POST", a.getFormStructureURL, {}, r).then((function(t) {
                console.log("Structure:", t), s.formStructure = t, s.isFormViewed = !0, s.imageURL = d.get("imagePath") + "/", n.go("viewReport"), e.isLoading = !1
            }))
        }, s.applicationId = "", s.controlMetadataId = "", e.reportStatusValue = 0, e.getReport = function(o, n) {
            s.getReportApplicationId = o, s.getReportControlMetadataId = n;
            var i = {},
                l = n;
            t.service("POST", a.getReportResultStatusURL, i, l).then((function(t) {
                e.reportStatusValue = t
            }));
            i = {}, l = o;
            e.controlMetadataId = n, t.service("POST", a.getApplicationDocumentsURL, i, l).then((function(t) {
                e.allDocuments = t, r.open({
                    animation: !1,
                    scope: e,
                    controller: "documentCTRL",
                    templateUrl: "app/pages/report/report-result/documentsModal/allDocumentsModal.html"
                })
            }))
        }, angular.forEach(s.multipleSelectValues, (function(e, t) {
            multipleSelectComponentShortName = t, angular.forEach(e, (function(e, t) {
                "" != selectedValues && (selectedValues += "_$_"), selectedValues += e
            }))
        })), e.openInformationModal = function(t) {
            if (null != t)
                for (var a = 0; a < t.length; a++) e.informationModalContent = t[a].key;
            r.open({
                animation: !1,
                scope: e,
                templateUrl: "app/pages/report/report-result/informationModal/informationModal.html"
            })
        }, e.parseStringObjectToJsonObject = function(t, a) {
            void 0 !== a[t] && (e.componentValues[t] = JSON.parse(a[t]))
        }, e.sendAssignmentBackModal = function(a) {
            e.isLoading = !0;
            var o = a.applicationId;
            e.controlMetadataId = a.controlMetadataId, console.log(a), t.service("POST", m.getAuthorisedUsersURL, {}, o).then((function(t) {
                e.newAssignmentInformation = {}, e.isLoading = !1, e.applicationUsers = t;
                for (var o = "", n = 0; n < t.length; n++) a.userRealName == t[n].userName && (o = t[n].id);
                e.newAssignmentInformation.userId = o, r.open({
                    animation: !1,
                    scope: e,
                    controller: "sendAssignmentBackModalCTRL",
                    templateUrl: "app/pages/report/report-result/sendAssignmentBackModal/sendAssignmentBack.html"
                })
            }))
        }, e.approvedReport = function(t) {
            e.approvedAssignmentId = t.id;
            var a = o("translate")("REPORT_RESULT_CONFIRM_MESSAGE_APPROVE"),
                n = {
                    animation: !1,
                    controller: "reportApprovedConfirmModalCTRL",
                    scope: e,
                    templateUrl: "app/modal/confirmDeleteModal.html"
                };
            p.openConfirmModal(n, a)
        }, e.inlineOptions = {
            customClass: function(t) {
                var a = t.date;
                if ("day" === t.mode)
                    for (var n = o("date")(a, "dd-MM-yyyy "), i = 0; i < e.events.length; i++) {
                        var s = o("date")(e.events[i].date, "dd-MM-yyyy ");
                        if (n === s) return e.events[i].status
                    }
                return ""
            },
            showWeeks: !0
        }, e.dateOptions = {
            formatYear: "yy",
            maxDate: (u = new Date, u.setDate(u.getDate() + 365), u),
            startingDay: 1
        }, e.open1 = function() {
            e.popup1.opened = !0
        }, e.open2 = function() {
            e.popup2.opened = !0
        }, e.formats = ["dd-MMMM-yyyy", "dd-MM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], e.format = e.formats[1], e.altInputFormats = ["M!/d!/yyyy"], e.popup1 = {
            opened: !1
        }, e.popup2 = {
            opened: !1
        };
        var g = new Date;
        g.setDate(g.getDate() + 1);
        var E = new Date;
        E.setDate(g.getDate() + 1), e.events = [{
            date: g,
            status: "full"
        }, {
            date: E,
            status: "partially"
        }]
    }
    e.$inject = ["$scope", "serviceImplementation", "ReportServiceURLs", "$filter", "$state", "reportStatus", "$rootScope", "$uibModal", "$timeout", "toastr", "$cookies", "Core", "assignTaskAndEquipmentURL"], angular.module("BlurAdmin.pages.report").controller("reportCTRL", e)
}(),
function() {
    "use strict";

    function viewReportCtrl($scope, $state, $rootScope, $uibModal, serviceImplementation, $q, toastr, connectionConfigURL) {
        $scope.goBack = function() {
            $state.go("report.reportResult")
        }, $scope.openMultipleSelectModal = function(e) {
            $scope.component = e, $uibModal.open({
                animation: !1,
                scope: $scope,
                templateUrl: "app/pages/report/report-result/multipleSelectModal/multipleSelectModal.html"
            })
        }, $scope.showPicture = function(e, t) {
            $scope.imageSrc = $rootScope.imageURL + $rootScope.formData[t][e].name, console.log($rootScope.formData[t][e].name + " is shown."), $uibModal.open({
                animation: !1,
                scope: $scope,
                templateUrl: "app/pages/report/report-result/imageModal/imageModal.html"
            })
        }, $scope.fillIlce = function(e, t) {
            $rootScope.formData[e] && "" != $rootScope.formData[e] && serviceImplementation.serviceWithoutToken("GET", connectionConfigURL + "/mfc/custom/getCountiesByCode/" + $rootScope.formData[e], {}, {}, "custom").then((function(e) {
                for (var a = [], o = [], n = 0; n < t.length; n++) document.getElementsByName("name" + t[n])[0].closest(".row").style.display = "flex";
                for (n = e.length; n < t.length; n++) document.getElementsByName("name" + t[n])[0].closest(".row").style.display = "none";
                for (var i = 0; i < e.length; i++) a.push({
                    type: "Option",
                    key: e[i].key,
                    name: e[i].value
                });
                angular.forEach($rootScope.formStructure.pages, (function(e) {
                    angular.forEach(e.forms, (function(e) {
                        angular.forEach(e.rows, (function(e) {
                            angular.forEach(e.components, (function(e) {
                                t.includes(e.shortName) && (o = [], angular.forEach(e.options, (function(e) {
                                    "Option" != e.type && o.push(e)
                                })), e.options = o.concat(a), console.log("component.options.length", e.options.length))
                            }))
                        }))
                    }))
                }))
            }), (function(e) {
                toastr.error("Ups! Something goes wrong please try again later!", "")
            }))
        }, $scope.$on("$viewContentLoaded", (function() {
            console.log("viewContentLoaded !?");
            var datasourceMap = [],
                isDatasourceExist = !1;
            angular.forEach($rootScope.formStructure.pages, (function(e) {
                angular.forEach(e.forms, (function(e) {
                    angular.forEach(e.rows, (function(e) {
                        angular.forEach(e.components, (function(e) {
                            e.datasourceType && angular.forEach(e.options, (function(t) {
                                if ("Datasource" == t.type) {
                                    var a = datasourceMap[t.value];
                                    a ? a.push(e) : datasourceMap[t.value] = [e], isDatasourceExist = !0
                                }
                            }))
                        }))
                    }))
                }))
            }));
            var keys = Object.keys(datasourceMap),
                promise_array = [];
            angular.forEach(keys, (function(e) {
                var t = datasourceMap[e],
                    a = serviceImplementation.serviceWithoutToken("GET", e, {}, {}, "custom").then((function(e) {
                        for (var a = [], o = 0; o < e.length; o++) a.push({
                            type: "Option",
                            key: e[o].key,
                            name: e[o].value
                        });
                        for (var n = 0; n < t.length; n++) t[n].options = t[n].options.concat(a)
                    }), (function(e) {
                        toastr.error("Ups! Something goes wrong please try again later!", "")
                    }));
                promise_array.push(a)
            })), $q.all(promise_array).then((function() {
                angular.forEach($rootScope.formStructure.pages, (function(page) {
                    angular.forEach(page.forms, (function(form) {
                        angular.forEach(form.rows, (function(row) {
                            angular.forEach(row.components, (function(component) {
                                component.datasourceType && angular.forEach(component.events, (function(event) {
                                    angular.forEach(event.functions, (function(functionTmp) {
                                        var startString = functionTmp.functionDetail.substring(0, 6);
                                        "fillIl" === startString && eval("$scope." + functionTmp.functionDetail)
                                    }))
                                }))
                            }))
                        }))
                    }))
                }))
            }))
        }))
    }
    viewReportCtrl.$inject = ["$scope", "$state", "$rootScope", "$uibModal", "serviceImplementation", "$q", "toastr", "connectionConfigURL"], angular.module("BlurAdmin.pages.report").controller("viewReportCTRL", viewReportCtrl)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c, d, p) {
        e.displayedUserAssignments = [], e.allUsers = [], c.changePreLoaderColor(), e.isSearchFilterExist = !1, e.selectedCriticalOption = {}, e.isAssignmentSave = !1, e.defaultOption = "ASSIGNTASKPAGE_MULTISELECT_DEFAULT", e.allApplications = [], e.multipleSelect = {
            data: []
        }, e.selectedCount = 0, e.taskInformation = {
            name: "",
            description: "",
            assignmentDate: "",
            expireDate: "",
            user: {},
            barcode: "",
            equipmentType: null
        }, e.buttonName = i("translate")("ADD_BUTTON"), e.isFirstTabValid = !1;
        var m = "",
            u = !1;
        e.maxSize = 5, e.bigTotalItems = "", e.itemPerPage = 5, e.bigCurrentPage = 1, e.isTableSearched = !1;
        var g, E = {};

        function T() {
            var t = {
                offset: null,
                order: "ASC",
                limit: null,
                filterRequest: [{
                    fieldName: "status",
                    value: 0
                }]
            };
            a.service("POST", o.getAllEquipmentTypesURL, {}, t).then((function(t) {
                e.allEquipmentTypes = t.objList
            }))
        }
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getTasks = function() {
            e.isLoading = !0;
            var t;
            1 == e.bigCurrentPage ? E.offset = 0 : E.offset = (e.bigCurrentPage - 1) * e.itemPerPage, E.order = e.orderKeyword, E.limit = e.itemPerPage, e.isTableSearched || (E.filterRequest = [], E.filterRequest.push({
                fieldName: "status",
                value: 0
            })), t = E, console.log("Parameter:", t), a.service("POST", o.getAssignmentsURL, {}, t).then((function(t) {
                e.isLoading = !1, e.bigTotalItems = t.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.itemPerPage), angular.copy(t.objList, e.displayedUserAssignments)
            }))
        }, e.getTasks(), e.changeRowsOnPage = function() {
            e.bigCurrentPage = 1, e.getTasks()
        }, e.deleteFilter = function() {
            e.formName = "", e.formVersion = "", e.userName = "", e.taskName = "", e.taskDescription = "", e.barcode = "", e.equipmentType = "", e.assignmentDate = "", e.expireDate = "", e.isTableSearched = !1, e.bigCurrentPage = 1, e.isSearchFilterExist && (e.isSearchFilterExist = !1, e.getTasks())
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getTasks()
        }, e.search = function() {
            if (e.isTableSearched = !0, e.isSearchFilterExist = !1, (E = {}).filterRequest = [], "" != e.formName && void 0 !== e.formName && (E.filterRequest.push({
                    fieldName: "application",
                    value: e.formName
                }), e.isSearchFilterExist = !0), "" != e.formVersion && void 0 !== e.formVersion && (E.filterRequest.push({
                    fieldName: "version",
                    value: e.formVersion
                }), e.isSearchFilterExist = !0), "" != e.userName && void 0 !== e.userName && (E.filterRequest.push({
                    fieldName: "user",
                    value: e.userName
                }), e.isSearchFilterExist = !0), "" != e.taskName && void 0 !== e.taskName && (E.filterRequest.push({
                    fieldName: "name",
                    value: e.taskName
                }), e.isSearchFilterExist = !0), "" != e.taskDescription && void 0 !== e.taskDescription && (E.filterRequest.push({
                    fieldName: "description",
                    value: e.taskDescription
                }), e.isSearchFilterExist = !0), "" != e.barcode && void 0 !== e.barcode && (E.filterRequest.push({
                    fieldName: "barcode",
                    value: e.barcode
                }), e.isSearchFilterExist = !0), "" != e.equipmentType && void 0 !== e.equipmentType && (E.filterRequest.push({
                    fieldName: "equipmentType",
                    value: e.equipmentType
                }), e.isSearchFilterExist = !0), "" != e.assignmentDate && void 0 !== e.assignmentDate) {
                var t = i("date")(e.assignmentDate, "yyyy-MM-dd HH:mm:ss");
                E.filterRequest.push({
                    fieldName: "assignmentDate",
                    value: t
                }), e.isSearchFilterExist = !0
            }
            if ("" != e.expireDate && void 0 !== e.expireDate) {
                var a = i("date")(e.expireDate, "yyyy-MM-dd HH:mm:ss");
                E.filterRequest.push({
                    fieldName: "expireDate",
                    value: a
                }), e.isSearchFilterExist = !0
            }
            e.bigCurrentPage = 1, E.filterRequest.push({
                fieldName: "status",
                value: 0
            }), e.isSearchFilterExist && e.getTasks()
        }, a.service("GET", o.getCriticalList, {}).then((function(t) {
            e.allCriticalOptionList = t;
            for (var a = t[0].value, o = "", n = 1; n < t.length; n++) t[n].value > a && (a = t[n].value, o = t[n].id);
            e.selectedCriticalOption.value = o
        })), T(), e.clearForm = function() {
            e.taskInformation = {
                name: "",
                description: "",
                assignmentDate: "",
                expireDate: "",
                user: {},
                barcode: "",
                equipmentType: null
            }, e.allApplications = [], e.isFirstTabValid = !1, u = !1, e.buttonName = i("translate")("ADD_BUTTON"), e.isAssignmentSave = !1, T()
        }, e.isSecondTabValid = function() {
            return "" != e.taskInformation.name && "" != e.taskInformation.description && "" != e.taskInformation.assignmentDate && null != e.taskInformation.assignmentDate && null != e.taskInformation.expireDate && "" != e.taskInformation.expireDate
        }, e.saveAssignment = function(t) {
            if (console.log("Data.applicationList in saveAssignment: ", e.multipleSelect.data), e.taskInformation.assignmentDate < e.taskInformation.expireDate && e.taskInformation.description.length < 1e4) {
                e.isAssignmentSave = !0;
                var n = angular.copy(e.taskInformation);
                n.expireDate = i("date")(n.expireDate, "yyyy-MM-dd HH:mm:ss"), n.assignmentDate = i("date")(n.assignmentDate, "yyyy-MM-dd HH:mm:ss"), n.expireDate = Date.parse(n.expireDate), n.assignmentDate = Date.parse(n.assignmentDate);
                var r = {},
                    c = {};
                c.criticalRatio = e.selectedCriticalOption.value, c.data = n, c.userName = l.get("username"), c.applicationList = e.multipleSelect.data, console.log("Data.applicationList:", e.multipleSelect.data), console.log("Data:", c.data), u ? a.service("POST", o.updateAssigmentsURL, r, c).then((function() {
                    s.success(i("translate")("ASSIGNTASKPAGE_UPDATESUCCESSMESSAGE"), ""), e.displayedUserAssignments[m] = e.taskInformation, e.active = 0, e.clearForm()
                }), (function() {
                    s.error(i("translate")("ASSIGNTASKPAGE_UPDATEERRORMESSAGE"), "")
                })) : a.service("POST", o.saveAssigmentsURL, r, c).then((function(t) {
                    e.getTasks(), s.success(i("translate")("ASSIGNTASKPAGE_ADDSUCCESSMESSAGE"), ""), e.active = 0, e.clearForm()
                }), (function() {
                    s.error(i("translate")("ASSIGNTASKPAGE_ADDERRORMESSAGE"), "")
                }))
            } else e.taskInformation.description.length > 1e4 ? s.error(i("translate")("CHARACTER_LIMITATION_ERRORMESSAGE_TASK_DESCRIPTION"), "") : s.error(i("translate")("ASSIGNTASKPAGE_ERROR_MESSAGE_DATA_COMPARE"), "")
        }, e.editAssignment = function(t, a) {
            m = a, u = !0, angular.copy(t, e.taskInformation), e.buttonName = i("translate")("SAVE_BUTTON"), e.getSelectedUserApplication().then((function(t) {
                e.allApplications = t, e.multipleSelect.data = [], console.log("taskInformation.application in edit: ", e.taskInformation.application), e.multipleSelect.data.push(e.taskInformation.application), e.applicationChangeEvent()
            }))
        }, e.removeAssignment = function(t, n) {
            var r = {};
            r.assignmentId = t, r.userName = l.get("username"), a.service("POST", o.deleteAssignmentURL, {}, r).then((function() {
                e.displayedUserAssignments.splice(n, 1), s.success(i("translate")("ASSIGNTASKPAGE_DELETESUCCESSMESSAGE"), "")
            }), (function() {
                s.error(i("translate")("ASSIGNTASKPAGE_DELETEERRORMESSAGE"), "")
            }))
        }, e.openForm = function() {
            t.isFormViewed = !1, t.formData = {};
            var o = {};
            o.applicationId = e.taskInformation.application.id, a.service("POST", p.getApplicationsURL, {}, o).then((function(a) {
                t.formStructure = a[0], r.open({
                    animation: !1,
                    scope: e,
                    templateUrl: "app/pages/task-management/assign-task-and-equipment/defaultSettingFormValuesModal/formModal.html"
                })
            }))
        }, e.openedAsssignmentDate = {}, e.openAsssignmentDate = function(t, a) {
            t.preventDefault(), t.stopPropagation(), e.openedAsssignmentDate[a] = !e.openedAsssignmentDate[a]
        }, e.openedExpiredDate = {}, e.openExpiredDate = function(t, a) {
            t.preventDefault(), t.stopPropagation(), e.openedExpiredDate[a] = !e.openedExpiredDate[a]
        }, e.inlineOptions = {
            customClass: function(t) {
                var a = t.date;
                if ("day" === t.mode)
                    for (var o = i("date")(a, "dd-MM-yyyy "), n = 0; n < e.events.length; n++) {
                        var s = i("date")(e.events[n].date, "dd-MM-yyyy ");
                        if (o === s) return e.events[n].status
                    }
                return ""
            },
            showWeeks: !0
        }, e.dateOptions = {
            formatYear: "yy",
            maxDate: (g = new Date, g.setDate(g.getDate() + 365), g),
            startingDay: 1
        }, e.open1 = function() {
            e.popup1.opened = !0
        }, e.open2 = function() {
            e.popup2.opened = !0
        }, e.open3 = function() {
            e.popup3.opened = !0
        }, e.open4 = function() {
            e.popup4.opened = !0
        }, e.formats = ["dd-MMMM-yyyy", "dd-MM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], e.format = e.formats[1], e.altInputFormats = ["M!/d!/yyyy"], e.popup1 = {
            opened: !1
        }, e.popup2 = {
            opened: !1
        }, e.popup3 = {
            opened: !1
        }, e.popup4 = {
            opened: !1
        };
        var f = new Date;
        f.setDate(f.getDate() + 1);
        var A = new Date;
        A.setDate(f.getDate() + 1), e.events = [{
            date: f,
            status: "full"
        }, {
            date: A,
            status: "partially"
        }], e.selectedApplication = function() {
            e.getSelectedUserApplication().then((function(t) {
                e.allApplications = t
            }))
        }, e.getSelectedUserApplication = function() {
            var t = angular.fromJson(e.taskInformation.user),
                n = "";
            if (null != t) return n = t.userName, a.service("POST", o.getUserApplicationsURL, {}, n);
            var i = d.defer();
            return i.resolve([]), i.promise
        }, e.applicationChangeEvent = function() {
            console.log("in applicationChangeEvent selected..", e.multipleSelect.data), null == e.multipleSelect.data || 0 == e.multipleSelect.data.length ? (e.selectedCount = 0, e.isFirstTabValid = !1) : (e.selectedCount = e.multipleSelect.data.length, e.isFirstTabValid = !0)
        }, e.userChangeEvent = function() {
            e.taskInformation.name = "", e.taskInformation.description = "", e.taskInformation.assignmentDate = "", e.taskInformation.expireDate = "", e.taskInformation.barcode = "", e.taskInformation.equipmentType = null, e.selectedCount = 0, e.isFirstTabValid = !1
        }, a.service("GET", n.getUsersURL, {}).then((function(t) {
            console.log("getUsersURL on success..", t), e.allUsers = t, t.length > 0 ? u || (e.taskInformation.user = "") : e.isFirstTabValid = !1, console.log("in getUsersURL all users: ", e.allUsers)
        }), (function(e) {}))
    }
    e.$inject = ["$scope", "$rootScope", "serviceImplementation", "assignTaskAndEquipmentURL", "assignApplicationURL", "$filter", "toastr", "$uibModal", "$cookies", "Core", "$q", "ReportServiceURLs"], angular.module("BlurAdmin.pages.task-management").controller("assignTaskAndEquipmentCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r) {
        r.changePreLoaderColor(), e.isLoading = !1, e.userInformation = {}, e.personalInfoForm = {}, e.userexist = !1, e.emailexist = !1, e.setFocused = function() {
            e.personalInfoForm.user.tcNo.$setValidity("tcNoExists", !0)
        }, e.saveUserInformation = function() {
            e.isLoading = !0;
            var r = {};
            r.data = e.userInformation, r.serverURI = s, r.userName = i.get("username"), t.service("POST", o.addUserURL, {}, r).then((function(t) {
                e.isLoading = !1, "105" == t && (e.userexist = !0, e.personalInfoForm.user.username.$invalid = !0), "106" == t && (e.emailexist = !0, e.personalInfoForm.user.email.$invalid = !0), "107" == t && (a.success(n("translate")("USERPAGE_ADDSUCCESSMESSAGE"), ""), e.personalInfoForm.user.$setPristine(!0), e.userInformation = {})
            }), (function(e) {
                a.error(n("translate")("USERPAGE_ADDERRORMESSAGE"), "")
            }))
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "toastr", "addNewUserURLs", "$filter", "$cookies", "mailConfigURL", "Core"], angular.module("BlurAdmin.pages.user").controller("addNewUserCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        i.yes = function() {
            var r = {};
            r.id = i.deletedUserId, r.userName = n.get("username"), e.service("POST", t.deleteUserInformationURL, {}, r).then((function() {
                i.displayedUserInformation.splice(i.deletedIndexOfUserArray, 1), a.success(o("translate")("USERPAGE_DELETESUCCESSMESSAGE"), "")
            }), (function() {
                a.error(o("translate")("USERPAGE_DELETEERRORMESSAGE"), "")
            })), s.close()
        }, i.no = function() {
            s.close()
        }
    }
    e.$inject = ["serviceImplementation", "listAndEditUserInformationURLs", "toastr", "$filter", "$cookies", "$scope", "$uibModalInstance"], angular.module("BlurAdmin.pages.user").controller("confirmDeleteUserCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.displayedUserInformation = [], s.changePreLoaderColor(), e.userInfoForm = {}, e.userInformationJSON = {
            name: "",
            surname: "",
            tcNumber: "",
            userName: "",
            companyName: "",
            occupation: "",
            email: "",
            address: "",
            phoneNumber: ""
        }, e.saveButtonDisabled = !0, e.isSearchFilterExist = !1, e.maxSize = 5, e.bigTotalItems = "", e.itemPerPage = 5, e.bigCurrentPage = 1, e.isTableSearched = !1;
        var r = {};
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getUserInformation = function() {
            e.isLoading = !0;
            var o;
            1 == e.bigCurrentPage ? r.offset = 0 : r.offset = (e.bigCurrentPage - 1) * e.itemPerPage, r.order = e.orderKeyword, r.limit = e.itemPerPage, e.isTableSearched || (r.filterRequest = [], r.filterRequest.push({
                fieldName: "status",
                value: 0
            })), o = r, console.log("Parameter:", o), a.service("POST", t.getUserInformationsURL, {}, o).then((function(t) {
                e.isLoading = !1, e.bigTotalItems = t.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.itemPerPage), angular.copy(t.objList, e.displayedUserInformation)
            }))
        }, e.getUserInformation(), e.changeRowsOnPage = function() {
            e.bigCurrentPage = 1, e.getUserInformation()
        }, e.deleteFilter = function() {
            e.name = "", e.surname = "", e.tcNumber = "", e.address = "", e.phoneNumber = "", e.email = "", e.username = "", e.company = "", e.occupation = "", e.isTableSearched = !1, e.bigCurrentPage = 1, e.isSearchFilterExist && (e.isSearchFilterExist = !1, e.getUserInformation())
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getUserInformation()
        }, e.search = function() {
            e.isTableSearched = !0, e.isSearchFilterExist = !1, (r = {}).filterRequest = [], "" != e.name && void 0 !== e.name && (r.filterRequest.push({
                fieldName: "name",
                value: e.name
            }), e.isSearchFilterExist = !0), "" != e.surname && void 0 !== e.surname && (r.filterRequest.push({
                fieldName: "surname",
                value: e.surname
            }), e.isSearchFilterExist = !0), "" != e.tcNumber && void 0 !== e.tcNumber && (r.filterRequest.push({
                fieldName: "tcNumber",
                value: e.tcNumber
            }), e.isSearchFilterExist = !0), "" != e.address && void 0 !== e.address && (r.filterRequest.push({
                fieldName: "address",
                value: e.address
            }), e.isSearchFilterExist = !0), "" != e.phoneNumber && void 0 !== e.phoneNumber && (r.filterRequest.push({
                fieldName: "phone",
                value: e.phoneNumber
            }), e.isSearchFilterExist = !0), "" != e.email && void 0 !== e.email && (r.filterRequest.push({
                fieldName: "email",
                value: e.email
            }), e.isSearchFilterExist = !0), "" != e.username && void 0 !== e.username && (r.filterRequest.push({
                fieldName: "username",
                value: e.username
            }), e.isSearchFilterExist = !0), "" != e.company && void 0 !== e.company && (r.filterRequest.push({
                fieldName: "companyName",
                value: e.company
            }), e.isSearchFilterExist = !0), "" != e.occupation && void 0 !== e.occupation && (r.filterRequest.push({
                fieldName: "occupation",
                value: e.occupation
            }), e.isSearchFilterExist = !0), e.bigCurrentPage = 1, e.isSearchFilterExist && e.getUserInformation()
        }, e.editUserInformation = function(t, a) {
            angular.copy(t, e.userInformationJSON), e.displayedUserInformationArrayIndex = a, e.saveButtonDisabled = !1
        }, e.removeUserInformation = function(t, a) {
            e.deletedUserId = t.id, e.deletedIndexOfUserArray = a;
            var o = i("translate")("CONFIRMDELETE_USER_MESSAGE"),
                n = {
                    animation: !1,
                    controller: "confirmDeleteUserCTRL",
                    scope: e,
                    templateUrl: "app/modal/confirmDeleteModal.html"
                };
            s.openConfirmModal(n, o)
        }, e.updateUserInformation = function() {
            e.saveButtonDisabled = !0;
            var s = {};
            s.data = e.userInformationJSON, s.userName = n.get("username"), a.service("POST", t.updateUserInformationURL, {}, s).then((function(t) {
                "105" == t && (e.userexist = !0, e.userInfoForm.user.username.$invalid = !0), "106" == t && (e.emailexist = !0, e.userInfoForm.user.email.$invalid = !0), "107" == t && (e.userInfoForm.user.$setPristine(!0), o.success(i("translate")("USERPAGE_UPDATESUCCESSMESSAGE"), ""), e.displayedUserInformation[e.displayedUserInformationArrayIndex] = e.userInformationJSON, e.userInformationJSON = {})
            }), (function() {
                o.error(i("translate")("USERPAGE_UPDATEERRORMESSAGE"), "")
            }))
        }
    }
    e.$inject = ["$scope", "listAndEditUserInformationURLs", "serviceImplementation", "toastr", "$cookies", "$filter", "Core"], angular.module("BlurAdmin.pages.user").controller("listAndEditUserInformationCTRL", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.pages.user").directive("selectpicker", (function() {
        return {
            restrict: "A",
            require: "?ngOptions",
            priority: 1500,
            link: {
                pre: function(e, t, a) {
                    t.append('<option data-hidden="true" disabled value="">' + (a.title || "Select something") + "</option>")
                },
                post: function(e, t, a) {
                    function o() {
                        t.selectpicker("refresh")
                    }
                    a.ngModel && e.$watch(a.ngModel, o), a.ngDisabled && e.$watch(a.ngDisabled, o), t.selectpicker({
                        dropupAuto: !1,
                        hideDisabled: !0
                    })
                }
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r, l, c) {
        t.displayedUsers = [], i.changePreLoaderColor(), t.isSearchFilterExist = !1, t.maxSize = 5, t.bigTotalItems = "", t.itemPerPage = 5, t.bigCurrentPage = 1, t.isTableSearched = !1;
        var d = {};
        t.isSortDownClicked = !1, t.isSortUpClicked = !0, t.orderKeyword = "ASC", t.getUserInformation = function() {
            t.isLoading = !0;
            var e;
            1 == t.bigCurrentPage ? d.offset = 0 : d.offset = (t.bigCurrentPage - 1) * t.itemPerPage, d.order = t.orderKeyword, d.limit = t.itemPerPage, t.isTableSearched || (d.filterRequest = [], d.filterRequest.push({
                fieldName: "status",
                value: 0
            })), e = d, console.log("Parameter:", e), l.service("POST", n.getUsersURL, {}, e).then((function(e) {
                t.isLoading = !1, t.bigTotalItems = e.totalSize, t.numPages = t.bigTotalItems / t.itemPerPage, angular.copy(e.objList, t.displayedUsers)
            }))
        }, t.getUserInformation(), t.changeRowsOnPage = function() {
            t.bigCurrentPage = 1, t.getUserInformation()
        }, t.deleteFilter = function() {
            t.name = "", t.surname = "", t.username = "", t.role = "", t.isTableSearched = !1, t.bigCurrentPage = 1, t.isSearchFilterExist && (t.isSearchFilterExist = !1, t.getUserInformation())
        }, t.sort = function(e) {
            t.orderKeyword = e, "ASC" == e ? (t.isSortUpClicked = !0, t.isSortDownClicked = !1) : (t.isSortDownClicked = !0, t.isSortUpClicked = !1), t.bigCurrentPage = 1, t.getUserInformation()
        }, t.search = function() {
            t.isTableSearched = !0, t.isSearchFilterExist = !1, (d = {}).filterRequest = [], "" != t.name && void 0 !== t.name && (d.filterRequest.push({
                fieldName: "name",
                value: t.name
            }), t.isSearchFilterExist = !0), "" != t.surname && void 0 !== t.surname && (d.filterRequest.push({
                fieldName: "surname",
                value: t.surname
            }), t.isSearchFilterExist = !0), "" != t.username && void 0 !== t.username && (d.filterRequest.push({
                fieldName: "username",
                value: t.username
            }), t.isSearchFilterExist = !0), "" != t.role && void 0 !== t.role && (d.filterRequest.push({
                fieldName: "roles.roleName",
                value: t.role,
                operation: 9
            }), t.isSearchFilterExist = !0), t.bigCurrentPage = 1, t.isSearchFilterExist && t.getUserInformation()
        }, l.service("GET", n.getRolesURL, {}).then((function(e) {
            t.allRoles = e
        })), t.showUserRoles = function(e) {
            var t = [];
            return angular.forEach(e, (function(e) {
                t.push(e.roleName)
            })), t.length ? t.join(", ") : "   -"
        }, t.saveUserChanges = function(e, i) {
            i.roles = e.$data.roles;
            var s = {};
            s.data = i, s.userName = c.get("username"), l.service("POST", n.saveUserRolesURL, {}, s).then((function() {
                o.success(a("translate")("USERPAGE_AUTHORISATIONSUCCESSMESSAGE"), "");
                var e;
                e = d, l.service("POST", n.getUsersURL, {}, e).then((function(e) {
                    t.bigTotalItems = e.totalSize, t.numPages = t.bigTotalItems / t.itemPerPage, angular.copy(e.objList, t.displayedUsers)
                }))
            }), (function() {
                o.error(a("translate")("USERPAGE_AUTHORISATIONERRORMESSAGE"), "")
            }))
        }
    }
    e.$inject = ["$rootScope", "$scope", "$filter", "toastr", "userAuthorisationURLs", "Core", "editableOptions", "editableThemes", "serviceImplementation", "$cookies"], angular.module("BlurAdmin.pages.user").controller("userAuthorisationCTRL", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").directive("backTop", (function() {
        return {
            restrict: "E",
            templateUrl: "app/theme/components/backTop/backTop.html",
            controller: function() {
                $("#backTop").backTop({
                    position: 200,
                    speed: 100
                })
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        return angular.extend({}, e, {
            template: function(a, o) {
                var n = "<div ng-class=\"{'active-users-panel': chart.description == 'DASHBOARD_PIECHART_ACTIVEUSER', 'active-device-panel': chart.description == 'DASHBOARD_PIECHART_ACTIVEDEVICE', 'all-tasks-panel': chart.description == 'DASHBOARD_PIECHART_CRITICALTASK' }\" class=\"panel  " + (t.theme.blur ? "panel-blur" : "") + " full-invisible " + (o.baPanelClass || "");
                return n += '" zoom-in ' + (t.theme.blur ? "ba-panel-blur" : "") + ">", n += e.template(a, o), n += "</div>"
            }
        })
    }
    e.$inject = ["baPanel", "baConfig"], angular.module("BlurAdmin.theme").directive("baPanel", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").factory("baPanel", (function() {
        return {
            restrict: "A",
            transclude: !0,
            template: function(e, t) {
                var a = '<div class="panel-body" ng-transclude></div>';
                t.baPanelTitle && (a = '<div class="dashboard-bar-panel-title clearfix"><h3 class="panel-title">' + t.baPanelTitle + "</h3></div>" + a);
                return a
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a) {
        var o;
        return e.bodyBgLoad().then((function() {
            o = e.getBodyBgImageSizes()
        })), t.addEventListener("resize", (function() {
            o = e.getBodyBgImageSizes()
        })), {
            restrict: "A",
            link: function(n, i) {
                function s() {
                    o && i.css({
                        backgroundSize: Math.round(o.width) + "px " + Math.round(o.height) + "px",
                        backgroundPosition: Math.floor(o.positionX) + "px " + Math.floor(o.positionY) + "px"
                    })
                }
                a.$isMobile || (e.bodyBgLoad().then((function() {
                    setTimeout(s)
                })), t.addEventListener("resize", s), n.$on("$destroy", (function() {
                    t.removeEventListener("resize", s)
                })))
            }
        }
    }
    e.$inject = ["baPanelBlurHelper", "$window", "$rootScope"], angular.module("BlurAdmin.theme").directive("baPanelBlur", e)
}(),
function() {
    "use strict";

    function e(e) {
        var t = e.defer(),
            a = getComputedStyle(document.body, ":before"),
            o = new Image;
        o.src = a.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, "$2"), o.onerror = function() {
            t.reject()
        }, o.onload = function() {
            t.resolve()
        }, this.bodyBgLoad = function() {
            return t.promise
        }, this.getBodyBgImageSizes = function() {
            var e = document.documentElement.clientWidth,
                t = document.documentElement.clientHeight;
            if (!(e <= 640)) {
                var a, n, i = o.height / o.width;
                return t / e > i ? (a = t, n = t / i) : (n = e, a = e * i), {
                    width: n,
                    height: a,
                    positionX: (e - n) / 2,
                    positionY: (t - a) / 2
                }
            }
        }
    }
    e.$inject = ["$q"], angular.module("BlurAdmin.theme").service("baPanelBlurHelper", e)
}(),
function() {
    "use strict";

    function e(e) {
        return angular.extend({}, e, {
            link: function(e, t, a) {
                t.addClass("panel panel-white"), a.baPanelClass && t.addClass(a.baPanelClass)
            }
        })
    }
    e.$inject = ["baPanel"], angular.module("BlurAdmin.theme").directive("baPanelSelf", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o) {
        var n = $(window);
        return {
            restrict: "E",
            templateUrl: "app/theme/components/baSidebar/ba-sidebar.html",
            controller: "BaSidebarCtrl",
            link: function(o, i) {
                function s(o) {
                    a.isDescendant(i[0], o.target) || o.originalEvent.$sidebarEventProcessed || t.isMenuCollapsed() || !t.canSidebarBeHidden() || (o.originalEvent.$sidebarEventProcessed = !0, e((function() {
                        t.setMenuCollapsed(!0)
                    }), 10))
                }

                function r() {
                    var e = t.shouldMenuBeCollapsed(),
                        a = i[0].childNodes[0].clientHeight - 84;
                    e == t.isMenuCollapsed() && o.menuHeight == a || o.$apply((function() {
                        o.menuHeight = a, t.setMenuCollapsed(e)
                    }))
                }
                o.menuHeight = i[0].childNodes[0].clientHeight - 84, n.on("click", s), n.on("resize", r), o.$on("$destroy", (function() {
                    n.off("click", s), n.off("resize", r)
                }))
            }
        }
    }
    e.$inject = ["$timeout", "baSidebarService", "baUtil", "layoutSizes"], angular.module("BlurAdmin.theme.components").directive("baSidebar", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").provider("baSidebarService", (function() {
        var e = [];
        this.addStaticItem = function() {
            e.push.apply(e, arguments)
        }, this.$get = ["$state", "layoutSizes", function(t, a) {
            return new function() {
                var o = n();

                function n() {
                    return window.innerWidth <= a.resWidthCollapseSidebar
                }
                this.getMenuItems = function() {
                    var a = t.get().filter((function(e) {
                            return e.sidebarMeta
                        })).map((function(e) {
                            var t = e.sidebarMeta;
                            return {
                                name: e.name,
                                title: e.title,
                                level: (e.name.match(/\./g) || []).length,
                                order: t.order,
                                icon: t.icon,
                                stateRef: e.name
                            }
                        })).sort((function(e, t) {
                            return 100 * (e.level - t.level) + e.order - t.order
                        })),
                        o = a.filter((function(e) {
                            return 0 == e.level
                        }));
                    return o.forEach((function(e) {
                        var t = a.filter((function(t) {
                            return 1 == t.level && 0 === t.name.indexOf(e.name)
                        }));
                        t.forEach((function(e) {
                            var t = a.filter((function(t) {
                                return 2 == t.level && 0 === t.name.indexOf(e.name)
                            }));
                            e.subMenu = t.length ? t : null
                        })), e.subMenu = t.length ? t : null
                    })), o.concat(e)
                }, this.shouldMenuBeCollapsed = n, this.canSidebarBeHidden = function() {
                    return window.innerWidth <= a.resWidthHideSidebar
                }, this.setMenuCollapsed = function(e) {
                    o = e
                }, this.isMenuCollapsed = function() {
                    return o
                }, this.toggleMenuCollapsed = function() {
                    o = !o
                }, this.getAllStateRefsRecursive = function(e) {
                    var t = [];
                    return function e(a) {
                        a.subMenu && a.subMenu.forEach((function(a) {
                            a.stateRef && t.push(a.stateRef), e(a)
                        }))
                    }(e), t
                }
            }
        }], this.$get.$inject = ["$state", "layoutSizes"]
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o) {
        e.menuItems = t.getMenuItems(), e.defaultSidebarState = e.menuItems[0].stateRef, e.adminMenu = function(e) {
            return o.userRole = a.get("userRole"), "false" != o.userRole || "SIDEMENU_TASK" !== e.title && "SIDEMENU_FORMS" !== e.title
        }, e.userMenu = function(e) {
            return "SIDEMENU_TASK" === e.title || "SIDEMENU_FORMS" === e.title
        }, e.hoverItem = function(t) {
            e.showHoverElem = !0, e.hoverElemHeight = t.currentTarget.clientHeight;
            e.hoverElemTop = t.currentTarget.getBoundingClientRect().top - 66
        }, e.$on("$stateChangeSuccess", (function() {
            t.canSidebarBeHidden() && t.setMenuCollapsed(!0)
        }))
    }
    e.$inject = ["$scope", "baSidebarService", "$cookies", "$rootScope"], angular.module("BlurAdmin.theme.components").controller("BaSidebarCtrl", e)
}(),
function() {
    "use strict";

    function e(e) {
        return {
            restrict: "A",
            link: function(t, a) {
                a.on("click", (function(a) {
                    a.originalEvent.$sidebarEventProcessed = !0, t.$apply((function() {
                        e.toggleMenuCollapsed()
                    }))
                }))
            }
        }
    }

    function t(e) {
        return {
            restrict: "A",
            link: function(t, a) {
                a.on("click", (function(a) {
                    a.originalEvent.$sidebarEventProcessed = !0, e.isMenuCollapsed() || t.$apply((function() {
                        e.setMenuCollapsed(!0)
                    }))
                }))
            }
        }
    }

    function a(e, t, a, o, n) {
        var i = this,
            s = i.$$menuItem = e.$eval(a.baSidebarTogglingItem);
        if (s && s.subMenu && s.subMenu.length) {
            i.$$expandSubmenu = function() {
                console.warn("$$expandMenu should be overwritten by baUiSrefTogglingSubmenu")
            }, i.$$collapseSubmenu = function() {
                console.warn("$$collapseSubmenu should be overwritten by baUiSrefTogglingSubmenu")
            };
            var r = n.getAllStateRefsRecursive(s);
            i.$expand = function() {
                i.$$expandSubmenu(), t.addClass("ba-sidebar-item-expanded")
            }, i.$collapse = function() {
                i.$$collapseSubmenu(), t.removeClass("ba-sidebar-item-expanded")
            }, i.$toggle = function() {
                t.hasClass("ba-sidebar-item-expanded") ? i.$collapse() : i.$expand()
            }, l(o.current) && t.addClass("ba-sidebar-item-expanded"), e.$on("$stateChangeStart", (function(e, a) {
                !l(a) && t.hasClass("ba-sidebar-item-expanded") && (i.$collapse(), t.removeClass("ba-sidebar-item-expanded"))
            })), e.$on("$stateChangeSuccess", (function(e, a) {
                l(a) && !t.hasClass("ba-sidebar-item-expanded") && (i.$expand(), t.addClass("ba-sidebar-item-expanded"))
            }))
        }

        function l(e) {
            return e && r.some((function(t) {
                return 0 == e.name.indexOf(t)
            }))
        }
    }

    function o(e) {
        return {
            restrict: "A",
            require: "^baSidebarTogglingItem",
            link: function(e, t, a, o) {
                o.$$expandSubmenu = function() {
                    t.slideDown()
                }, o.$$collapseSubmenu = function() {
                    t.slideUp()
                }
            }
        }
    }

    function n(e) {
        return {
            restrict: "A",
            require: "^baSidebarTogglingItem",
            link: function(t, a, o, n) {
                a.on("click", (function() {
                    e.isMenuCollapsed() ? (t.$apply((function() {
                        e.setMenuCollapsed(!1)
                    })), n.$expand()) : n.$toggle()
                }))
            }
        }
    }
    e.$inject = ["baSidebarService"], t.$inject = ["baSidebarService"], a.$inject = ["$scope", "$element", "$attrs", "$state", "baSidebarService"], o.$inject = ["$state"], n.$inject = ["baSidebarService"], angular.module("BlurAdmin.theme.components").directive("baSidebarToggleMenu", e).directive("baSidebarCollapseMenu", t).directive("baSidebarTogglingItem", (function() {
        return {
            restrict: "A",
            controller: "BaSidebarTogglingItemCtrl"
        }
    })).controller("BaSidebarTogglingItemCtrl", a).directive("baUiSrefTogglingSubmenu", o).directive("baUiSrefToggler", n)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").directive("baWizard", (function() {
        return {
            restrict: "E",
            transclude: !0,
            templateUrl: "app/theme/components/baWizard/baWizard.html",
            controllerAs: "$baWizardController",
            controller: "baWizardCtrl"
        }
    }))
}(),
function() {
    "use strict";

    function e(e) {
        var t = this;
        t.tabs = [], t.tabNum = 0, t.progress = 0, t.addTab = function(e) {
            e.setPrev(t.tabs[t.tabs.length - 1]), t.tabs.push(e), t.selectTab(0)
        }, e.$watch(angular.bind(t, (function() {
            return t.tabNum
        })), (function() {
            t.progress = (t.tabNum + 1) / t.tabs.length * 100
        })), t.selectTab = function(e) {
            t.tabs[t.tabNum].submit(), t.tabs[e].isAvailiable() && (t.tabNum = e, t.tabs.forEach((function(e, a) {
                a == t.tabNum ? e.select(!0) : e.select(!1)
            })))
        }, t.isFirstTab = function() {
            return 0 == t.tabNum
        }, t.isLastTab = function() {
            return t.tabNum == t.tabs.length - 1
        }, t.nextTab = function() {
            t.selectTab(t.tabNum + 1)
        }, t.previousTab = function() {
            t.selectTab(t.tabNum - 1)
        }
    }
    e.$inject = ["$scope"], angular.module("BlurAdmin.theme.components").controller("baWizardCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").directive("baWizardStep", (function() {
        return {
            restrict: "E",
            transclude: !0,
            require: "^baWizard",
            scope: {
                form: "="
            },
            templateUrl: "app/theme/components/baWizard/baWizardStep.html",
            link: function(e, t, a, o) {
                e.selected = !0;
                var n = {
                    title: a.title,
                    select: function(t) {
                        e.selected = !!t
                    },
                    submit: function() {
                        e.form && e.form.$setSubmitted(!0)
                    },
                    isComplete: function() {
                        return !e.form || e.form.$valid
                    },
                    isAvailiable: function() {
                        return !n.prevTab || n.prevTab.isComplete()
                    },
                    prevTab: void 0,
                    setPrev: function(e) {
                        n.prevTab = e
                    }
                };
                o.addTab(n)
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            restrict: "E",
            templateUrl: "app/theme/components/contentTop/contentTop.html",
            link: function(e) {
                e.$watch((function() {
                    e.activePageTitle = t.current.title
                }))
            }
        }
    }
    e.$inject = ["$location", "$state"], angular.module("BlurAdmin.theme.components").directive("contentTop", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").directive("msgCenter", (function() {
        return {
            restrict: "E",
            templateUrl: "app/theme/components/msgCenter/msgCenter.html",
            controller: "MsgCenterCtrl"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t) {
        e.users = {
            0: {
                name: "Vlad"
            },
            1: {
                name: "Kostya"
            },
            2: {
                name: "Andrey"
            },
            3: {
                name: "Nasta"
            }
        }, e.notifications = [{
            userId: 0,
            template: "&name posted a new article.",
            time: "1 min ago"
        }, {
            userId: 1,
            template: "&name changed his contact information.",
            time: "2 hrs ago"
        }, {
            image: "assets/img/shopping-cart.svg",
            template: "New orders received.",
            time: "5 hrs ago"
        }, {
            userId: 2,
            template: "&name replied to your comment.",
            time: "1 day ago"
        }, {
            userId: 3,
            template: "Today is &name's birthday.",
            time: "2 days ago"
        }, {
            image: "assets/img/comments.svg",
            template: "New comments on your post.",
            time: "3 days ago"
        }, {
            userId: 1,
            template: "&name invited you to join the event.",
            time: "1 week ago"
        }], e.messages = [{
            userId: 3,
            text: "After you get up and running, you can place Font Awesome icons just about...",
            time: "1 min ago"
        }, {
            userId: 0,
            text: "You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.",
            time: "2 hrs ago"
        }, {
            userId: 1,
            text: "Want to request new icons? Here's how. Need vectors or want to use on the...",
            time: "10 hrs ago"
        }, {
            userId: 2,
            text: "Explore your passions and discover new ones by getting involved. Stretch your...",
            time: "1 day ago"
        }, {
            userId: 3,
            text: "Get to know who we are - from the inside out. From our history and culture, to the...",
            time: "1 day ago"
        }, {
            userId: 1,
            text: "Need some support to reach your goals? Apply for scholarships across a variety of...",
            time: "2 days ago"
        }, {
            userId: 0,
            text: "Wrap the dropdown's trigger and the dropdown menu within .dropdown, or...",
            time: "1 week ago"
        }], e.getMessage = function(a) {
            var o = a.template;
            return (a.userId || 0 === a.userId) && (o = o.replace("&name", "<strong>" + e.users[a.userId].name + "</strong>")), t.trustAsHtml(o)
        }
    }
    e.$inject = ["$scope", "$sce"], angular.module("BlurAdmin.theme.components").controller("MsgCenterCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").directive("pageTop", (function() {
        return {
            restrict: "E",
            templateUrl: "app/theme/components/pageTop/pageTop.html",
            controller: "pageTopCtrl"
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a, o) {
        e.pageTop = {}, e.pageTop.username = o.get("username"), e.changeLanguage = function(e) {
            localStorage.setItem("selectedLanguage", e), t.use(e)
        }
    }
    e.$inject = ["$scope", "$translate", "$rootScope", "$cookies"], angular.module("BlurAdmin.theme.components").controller("pageTopCtrl", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components").directive("widgets", (function() {
        return {
            restrict: "EA",
            scope: {
                ngModel: "="
            },
            templateUrl: "app/theme/components/widgets/widgets.html",
            replace: !0
        }
    }))
}(),
function() {
    "use strict";

    function e(e) {
        return {
            restrict: "E",
            templateUrl: "app/theme/components/progressBarRound/progressBarRound.html",
            link: function(t, a, o) {
                t.baProgressDialog = e, t.$watch((function() {
                    return e.getProgress()
                }), (function() {
                    a.find("#loader")[0].setAttribute("stroke-dasharray", 180 * e.getProgress() * Math.PI / 100 + ", 20000"), t.progress = e.getProgress()
                }))
            }
        }
    }
    e.$inject = ["baProgressModal"], angular.module("BlurAdmin.theme.components").directive("progressBarRound", e)
}(),
function() {
    "use strict";

    function e(e) {
        return function(t) {
            return e.images.root + t
        }
    }
    e.$inject = ["layoutPaths"], angular.module("BlurAdmin.theme").filter("appImage", e)
}(),
function() {
    "use strict";

    function e(e) {
        return function(t) {
            return e.images.root + "theme/icon/kameleon/" + t + ".svg"
        }
    }
    e.$inject = ["layoutPaths"], angular.module("BlurAdmin.theme").filter("kameleonImg", e)
}(),
function() {
    "use strict";

    function e(e) {
        return function(t, a) {
            return a = a || "png", e.images.profile + t + "." + a
        }
    }
    e.$inject = ["layoutPaths"], angular.module("BlurAdmin.theme").filter("profilePicture", e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme").filter("plainText", (function() {
        return function(e) {
            return e ? String(e).replace(/<[^>]+>/gm, "") : ""
        }
    }))
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.inputs").directive("baSwitcher", (function() {
        return {
            templateUrl: "app/theme/inputs/baSwitcher/baSwitcher.html",
            scope: {
                switcherStyle: "@",
                switcherValue: "="
            }
        }
    }))
}(),
function() {
    "use strict";

    function e(e, t, a) {
        e.checkIsRowValid = function(e) {
            "" != t.reportRows[e].value && (t.reportRows[e].valid = !0)
        }, e.setTemplate = function(e) {
            t.alltemplateParamList = [];
            for (var a = 0; a < t.templateParamListFromService.length; a++) {
                for (var o = !1, n = 0; n < t.reportRows.length; n++) t.templateParamListFromService[a] == t.reportRows[n].key && e != t.reportRows[n].key && (o = !0);
                o || t.alltemplateParamList.push(t.templateParamListFromService[a])
            }
        }
    }
    e.$inject = ["$scope", "$rootScope", "$uibModalInstance"], angular.module("BlurAdmin.pages.report").controller("parameterListModalCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        e.isDisabled = !1, e.documentTypes = [{
            name: "PDF",
            value: !0
        }, {
            name: s("translate")("ALLDOCUMENT_OTHER_DOCUMENT_TYPE"),
            value: !1
        }], e.setReportStatus = function() {
            0 == e.reportStatusValue || 1 == e.reportStatusValue ? (e.reportStatus = s("translate")("REPORT_DOCUMENTMODAL_STATUS_PREPARING"), e.isDisabled = !0) : 2 == e.reportStatusValue ? (e.reportStatus = s("translate")("REPORT_DOCUMENTMODAL_STATUS_DOWNLOADABLE"), e.isDisabled = !1) : 3 == e.reportStatusValue && (e.reportStatus = s("translate")("REPORT_DOCUMENTMODAL_STATUS_CORRUPTED"), e.isDisabled = !0)
        }, e.reloadModal = function() {
            var n = {},
                i = o.getReportControlMetadataId;
            t.service("POST", a.getReportResultStatusURL, n, i).then((function(t) {
                e.reportStatusValue = t, e.setReportStatus(), console.log(" $scope.reportStatusValue:: ", e.reportStatusValue)
            }));
            n = {}, i = o.getReportApplicationId;
            t.service("POST", a.getApplicationDocumentsURL, n, i).then((function(t) {
                e.allDocuments = t
            }))
        }, e.setReportStatus(), e.selectedType = {}, e.initializeDocumentType = function(t) {
            void 0 === e.selectedType[t] && (e.selectedType[t] = e.documentTypes[0].value)
        }, e.getReportResults = function(o) {
            var s = {};
            s.controlMetadataId = e.controlMetadataId, s.documentId = o, console.log("Document id:" + o), t.service("POST", a.getReportResultURL, {}, s).then((function(e) {
                console.log("getReportResults returned data: ", e), document.outFileName = e.value;
                var t = e.value.lastIndexOf("."),
                    o = e.value.slice(0, t + 1) + "pdf";
                console.log("pdf dokuman adi :" + o);
                var s = document.createElement("a");
                s.setAttribute("href", n + a.fileURL + "?fileName=" + o + "&token=" + i.get("token")), s.setAttribute("download", o), s.setAttribute("target", "_blank"), s.click()
            }))
        }, e.createReport = function(o, s, r) {
            var l = {};
            l.controlMetadataId = e.controlMetadataId, l.documentId = o, l.isPdfRequest = r, console.log("Document id:" + o + " fileName:" + o + " fileType:" + r), t.getFile("POST", a.createReportURL, {}, l).then((function(e) {
                console.log("creat report returned data: ", e), document.outFileName = e;
                var t = document.createElement("a");
                (t = document.createElement("a")).setAttribute("href", n + a.fileURL + "?fileName=" + document.outFileName + "&token=" + i.get("token")), t.setAttribute("download", document.selectedFileName), t.setAttribute("target", "_blank"), t.click()
            }))
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "ReportServiceURLs", "$rootScope", "connectionConfigURL", "$cookies", "$filter"], angular.module("BlurAdmin.pages.report").controller("documentCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r) {
        var l;
        e.onSendAssignmentBack = function() {
            var n = {};
            n.userName = o.get("username"), n.detail = e.newAssignmentInformation.description, n.assignmentDate = (new Date).getTime(), n.dueDate = e.newAssignmentInformation.expireDate.getTime(), n.controlMetadataId = e.controlMetadataId, n.userId = e.newAssignmentInformation.userId, t.service("POST", a.sendReportBackURL, {}, n).then((function() {
                e.reAssignmentForm.$setPristine(), e.reAssignmentForm.$submitted = !1, e.newAssignmentInformation = {}, e.getReports(), i.success(r("translate")("REPORT_RESULT_SUCCESS_REJECT_MESSAGE"), ""), s.close()
            }), (function() {
                i.error(r("translate")("REPORT_RESULT_ERROR_REJECT_MESSAGE"), "")
            }))
        }, e.inlineOptions = {
            customClass: function(t) {
                var a = t.date;
                if ("day" === t.mode)
                    for (var o = r("date")(a, "dd-MM-yyyy "), n = 0; n < e.events.length; n++) {
                        var i = r("date")(e.events[n].date, "dd-MM-yyyy ");
                        if (o === i) return e.events[n].status
                    }
                return ""
            },
            showWeeks: !0
        }, e.dateOptions = {
            formatYear: "yy",
            maxDate: (l = new Date, l.setDate(l.getDate() + 365), l),
            startingDay: 1
        }, e.open3 = function() {
            e.popup3.opened = !0
        }, e.formats = ["dd-MMMM-yyyy", "dd-MM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], e.format = e.formats[1], e.altInputFormats = ["M!/d!/yyyy"], e.popup3 = {
            opened: !1
        };
        var c = new Date;
        c.setDate(c.getDate() + 1);
        var d = new Date;
        d.setDate(c.getDate() + 1), e.events = [{
            date: c,
            status: "full"
        }, {
            date: d,
            status: "partially"
        }]
    }
    e.$inject = ["$scope", "serviceImplementation", "ReportServiceURLs", "$cookies", "$uibModal", "toastr", "$uibModalInstance", "$filter"], angular.module("BlurAdmin.pages").controller("sendAssignmentBackModalCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s, r) {
        var l = !1;
        r.changePreLoaderColor(), e.isSearchFilterExist = !1, e.displayedEquipment = [], e.maxSize = 5, e.bigTotalItems = "", e.itemPerPage = 5, e.bigCurrentPage = 1, e.isTableSearched = !1;
        var c = {};
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC";
        var d = {};
        d.offset = null, d.order = "ASC", d.limit = null, d.filterRequest = [], d.filterRequest.push({
            fieldName: "status",
            value: 0
        }), o.service("POST", i.getEquipmentTypesURL, {}, d).then((function(t) {
            e.allEquipmentTypes = t.objList
        })), e.getAllEquipment = function() {
            e.isLoading = !0;
            var t;
            1 == e.bigCurrentPage ? c.offset = 0 : c.offset = (e.bigCurrentPage - 1) * e.itemPerPage, c.order = e.orderKeyword, c.limit = e.itemPerPage, e.isTableSearched || (c.filterRequest = [], c.filterRequest.push({
                fieldName: "status",
                value: 0
            })), t = c, console.log("Parameter:", t), o.service("POST", i.getEquipmentURL, {}, t).then((function(t) {
                e.isLoading = !1, e.bigTotalItems = t.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.itemPerPage), angular.copy(t.objList, e.displayedEquipment)
            }))
        }, e.getAllEquipment(), e.changeRowsOnPage = function() {
            e.bigCurrentPage = 1, e.getAllEquipment()
        }, e.deleteFilter = function() {
            e.name = "", e.description = "", e.serialNumber = "", e.equipmentType = "", e.isTableSearched = !1, e.bigCurrentPage = 1, e.isSearchFilterExist && (e.getAllEquipment(), e.isSearchFilterExist = !1)
        }, e.sort = function(t) {
            e.isLoading = !0, e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getAllEquipment()
        }, e.search = function() {
            e.isTableSearched = !0, e.isSearchFilterExist = !1, (c = {}).filterRequest = [], "" != e.name && void 0 !== e.name && (c.filterRequest.push({
                fieldName: "name",
                value: e.name
            }), e.isSearchFilterExist = !0), "" != e.description && void 0 !== e.description && (c.filterRequest.push({
                fieldName: "description",
                value: e.description
            }), e.isSearchFilterExist = !0), "" != e.serialNumber && void 0 !== e.serialNumber && (c.filterRequest.push({
                fieldName: "serialNumber",
                value: e.serialNumber
            }), e.isSearchFilterExist = !0), "" != e.equipmentType && void 0 !== e.equipmentType && (c.filterRequest.push({
                fieldName: "equipmentType",
                value: e.equipmentType
            }), e.isSearchFilterExist = !0), c.filterRequest.push({
                fieldName: "status",
                value: 0
            }), e.isSearchFilterExist && e.getAllEquipment()
        }, e.removeEquipment = function(t, r) {
            var l;
            t.$data.id = r, l = t.$data;
            var c = e.displayedEquipment.findIndex((function(e, t) {
                    return e.id === r
                })),
                d = {};
            d.data = l, d.userName = s.get("username"), o.service("POST", i.deleteEquipmentURL, {}, d).then((function() {
                e.displayedEquipment.splice(c, 1), a.success(n("translate")("ADDEQUIPMENTPAGE_DELETESUCCESSMESSAGE"), "")
            }), (function() {
                a.error(n("translate")("ADDEQUIPMENTPAGE_DELETEERRORMESSAGE"), "")
            }))
        }, e.addEquipment = function() {
            e.inserted = {
                id: e.displayedEquipment.length + 1,
                name: "",
                description: "",
                serialNumber: "",
                equipmentType: ""
            }, l = !0, e.displayedEquipment.unshift(e.inserted)
        }, e.updateEquipment = function(t, r) {
            if (l) {
                var c = {};
                (d = {}).data = t.$data, d.userName = s.get("username"), o.service("POST", i.saveEquipmentURL, c, d).then((function(t) {
                    e.inserted.id = t, e.getAllEquipment(), a.success(n("translate")("ADDEQUIPMENTPAGE_ADDSUCCESSMESSAGE"), "")
                }), (function() {
                    a.error(n("translate")("ADDEQUIPMENTPAGE_ADDERRORMESSAGE"), "")
                })), l = !1
            } else {
                t.$data.id = r;
                var d;
                c = {};
                (d = {}).data = t.$data, d.userName = s.get("username"), o.service("POST", i.updateEquipmentURL, c, d).then((function() {
                    a.success(n("translate")("ADDEQUIPMENTPAGE_UPDATESUCCESSMESSAGE"), "")
                }), (function() {
                    a.error(n("translate")("ADDEQUIPMENTPAGE_UPDATEERRORMESSAGE"), "")
                }))
            }
        }, e.removeEmptyRow = function() {
            l && e.displayedEquipment.splice(0, 1)
        }
    }
    e.$inject = ["$scope", "$rootScope", "toastr", "serviceImplementation", "$filter", "addAndEditEquipmentOperationsURL", "$cookies", "Core"], angular.module("BlurAdmin.pages.task-management").controller("addAndEditEquipmentCTRL", e)
}(),
function() {
    "use strict";

    function e(e, t, a, o, n, i, s) {
        s.changePreLoaderColor(), e.displayedEquipmentTypes = [], e.isSearchFilterExist = !1;
        var r = !1;
        e.maxSize = 5, e.bigTotalItems = "", e.itemPerPage = 5, e.bigCurrentPage = 1, e.isTableSearched = !1;
        var l = {};
        e.isSortDownClicked = !1, e.isSortUpClicked = !0, e.orderKeyword = "ASC", e.getEquipmentTypes = function() {
            e.isLoading = !0;
            var o;
            1 == e.bigCurrentPage ? l.offset = 0 : l.offset = (e.bigCurrentPage - 1) * e.itemPerPage, l.order = e.orderKeyword, l.limit = e.itemPerPage, e.isTableSearched || (l.filterRequest = [], l.filterRequest.push({
                fieldName: "status",
                value: 0
            })), o = l, console.log("Parameter:", o), t.service("POST", a.getEquipmentTypesURL, {}, o).then((function(t) {
                e.isLoading = !1, e.bigTotalItems = t.totalSize, e.numPages = Math.floor(e.bigTotalItems / e.itemPerPage), angular.copy(t.objList, e.displayedEquipmentTypes)
            }))
        }, e.getEquipmentTypes(), e.changeRowsOnPage = function() {
            e.bigCurrentPage, e.getEquipmentTypes()
        }, e.deleteFilter = function() {
            e.name = "", e.isTableSearched = !1, e.bigCurrentPage = 1, e.isSearchFilterExist && (e.isSearchFilterExist = !1, e.getEquipmentTypes())
        }, e.sort = function(t) {
            e.orderKeyword = t, "ASC" == t ? (e.isSortUpClicked = !0, e.isSortDownClicked = !1) : (e.isSortDownClicked = !0, e.isSortUpClicked = !1), e.getEquipmentTypes()
        }, e.search = function() {
            e.isTableSearched = !0, e.isSearchFilterExist = !1, (l = {}).filterRequest = [], "" != e.name && void 0 !== e.name && (l.filterRequest.push({
                fieldName: "name",
                value: e.name
            }), e.isSearchFilterExist = !0), e.bigCurrentPage = 1, l.filterRequest.push({
                fieldName: "status",
                value: 0
            }), e.isSearchFilterExist && e.getEquipmentTypes()
        }, e.addEquipmentType = function() {
            e.inserted = {
                name: ""
            }, e.displayedEquipmentTypes.unshift(e.inserted)
        }, e.saveEquipmentType = function(s) {
            r = !1;
            for (var l = 0; l < e.displayedEquipmentTypes.length; l++) e.displayedEquipmentTypes[l].name.toLowerCase() == s.$data.name.toLowerCase() && (r = !0, e.equipmentTypeName = s.$data.name);
            if (r) i.open({
                animation: !1,
                scope: e,
                templateUrl: "app/pages/task-management/equipment-operations/add-and-edit-equipment-type/equipmentExistenceModal.html"
            });
            else {
                var c = s.$data;
                t.service("POST", a.addEquipmentTypeURL, {}, c).then((function(t) {
                    e.inserted.id = t, n.success(o("translate")("ADDEQUIPMENTTYPEPAGE_ADDSUCCESSMESSAGE"), "")
                }), (function() {
                    n.error(o("translate")("ADDEQUIPMENTTYPEPAGE_ADDERRORMESSAGE"), "")
                }))
            }
        }, e.removeEquipmentType = function(s) {
            var r = e.displayedEquipmentTypes.findIndex((function(e, t) {
                    return e.id === s
                })),
                l = s;
            t.service("POST", a.deleteEquipmentTypeURL, {}, l).then((function(t) {
                t > 0 ? i.open({
                    animation: !1,
                    scope: e,
                    templateUrl: "app/pages/task-management/equipment-operations/add-and-edit-equipment-type/addAndEditEquipmentTypeModal.html"
                }) : (e.displayedEquipmentTypes.splice(r, 1), n.success(o("translate")("ADDEQUIPMENTTYPEPAGE_DELETESUCCESSMESSAGE"), ""))
            }), (function() {
                n.error(o("translate")("ADDEQUIPMENTTYPEPAGE_DELETEERRORMESSAGE"), "")
            }))
        }, e.removeEmptyRow = function() {
            e.displayedEquipmentTypes.splice(0, 1)
        }
    }
    e.$inject = ["$scope", "serviceImplementation", "addAndEditEquipmentTypeURLs", "$filter", "toastr", "$uibModal", "Core"], angular.module("BlurAdmin.pages.task-management").controller("addAndEditEquipmentTypeCTRL", e)
}(),
function(e) {
    e.fn.backTop = function(t) {
        var a = this,
            o = e.extend({
                position: 400,
                speed: 500,
                color: "white"
            }, t),
            n = o.position,
            i = o.speed,
            s = o.color;
        a.addClass("white" == s ? "white" : "red" == s ? "red" : "green" == s ? "green" : "black"), a.css({
            right: 40,
            bottom: 40,
            position: "fixed"
        }), e(document).scroll((function() {
            e(window).scrollTop() >= n ? a.fadeIn(i) : a.fadeOut(i)
        })), a.click((function() {
            e("html, body").animate({
                scrollTop: 0
            }, {
                duration: 1200
            })
        }))
    }
}(jQuery), angular.module("BlurAdmin").run(["$templateCache", function(e) {
    e.put("app/form-page/component-page.html", '<div data-ng-repeat="form in page.forms track by $index" class="viewReport-content form-style"><h4 ng-if="form.title != \'\'" align="center"><b>{{form.title}}</b></h4><ng-form name="form{{form.shortName}}" ng-controller="formPageCTRL"><div class="row responsive-sm" data-ng-repeat="row in form.rows" ng-init="setComponentsColSize(page,$parent.$index,$index)"><div data-ng-repeat="component in row.components" class="col {{component.colSize}}"><div ng-switch="" on="component.type" ng-init="shortName=component.shortName;"><div ng-switch-when="Text"><div ng-bind-html="createHTMLForText(component.options)"></div></div><div ng-switch-when="TextBox"><label class="item item-input item-stacked-label"><span ng-if="haveHeader" class="input-label">{{header}}</span> <input type="text" style="width: 100%" event="component.events" validation="component" ng-blur="isInAdminFormPage && checkTextTypeNumberValidation(component.shortName)" name="name{{component.shortName}}" metadata="component.options" ng-disabled="isFormViewed" string-to-date="component.options" ng-required="requiredValidation[component.shortName]" ng-model="formData[component.shortName]" string-to-number="component.options"></label><br><div ng-if="componentValidationType[component.shortName] == validationType.VALIDATION"><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="minlength">{{message["minlength"]}}</div><div ng-message="maxlength">{{message["maxlength"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div><div ng-if="isInAdminFormPage" style="color: red" ng-show="showValidationMessageOfTextBox(component.shortName) && formInf.mainForm.$submitted"><div ng-show="!maxNumberValidation[component.shortName].validation">{{message["max-number-size"]}}</div><div ng-show="!minNumberValidation[component.shortName].validation">{{message["min-number-size"]}}</div></div></div><div ng-if="componentValidationType[component.shortName] == validationType.NOTIFICATION"><div ng-if="isInAdminFormPage" style="color: orange" ng-show="showValidationMessageOfTextBox(component.shortName)"><div ng-show="!maxNumberValidation[component.shortName].validation">{{message["max-number-size"]}}</div><div ng-show="!minNumberValidation[component.shortName].validation">{{message["min-number-size"]}}</div></div></div><br></div><div ng-switch-when="Button"><button ng-if="!isInAdminFormPage" disabled="" class="button {{componentOptions[component.shortName].size}} {{componentOptions[component.shortName].color}} {{componentOptions[component.shortName].style}}">{{componentOptions[component.shortName].value}}</button><div ng-if="isInAdminFormPage" component-button="" ng-init="formComponent.attributes=component"></div></div><div ng-switch-when="TextArea"><label class="item item-input"><textarea style="width: 100%" name="name{{component.shortName}}" validation="component" event="component.events" metadata="component.options" ng-blur="isInAdminFormPage && checkTextTypeNumberValidation(component.shortName)" ng-readonly="isFormViewed" ng-required="requiredValidation[component.shortName]" ng-model="formData[component.shortName]"></textarea></label><div ng-if="componentValidationType[component.shortName] == validationType.VALIDATION"><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="minlength">{{message["ng-minlength"]}}</div><div ng-message="maxlength">{{message["ng-maxlength"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div><div ng-if="isInAdminFormPage" style="color: red" ng-show="showValidationMessageOfTextBox(component.shortName) && formInf.mainForm.$submitted"><div ng-show="!maxNumberValidation[component.shortName].validation">{{message["max-number-size"]}}</div><div ng-show="!minNumberValidation[component.shortName].validation">{{message["min-number-size"]}}</div></div></div></div><div ng-switch-when="CheckBox"><div ng-repeat="option in component.options track by $index"><div ng-if="option.name == \'label\' && option.key != \'\' | limitTo:1"><div class="item item-divider">{{option.key}}</div></div></div><div ng-if="!isFormViewed"><ion-list><ion-checkbox style="width: 100%" ng-repeat="option in component.options | filter : {type : \'Option\'}" ng-model="formData[component.shortName][option.key]" id="{{component.shortName+$index}}" name="name{{component.shortName+$index}}" ng-true-value="\'{{option.name}}\'" ng-false-value="\'false\'" metadata="component.options" ng-change="isInAdminFormPage && checkMultiOptionsValidation(component.shortName)" event="component.events" validation="component">{{option.key}}</ion-checkbox></ion-list><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div><div ng-if="isInAdminFormPage" style="color: red" ng-show="showValidationMessageOfMultiOptionComponent(component.shortName) && formInf.mainForm.$submitted"><div ng-show="!maxCheckValidation[component.shortName]">{{message["max-choice-size"]}}</div><div ng-show="!minCheckValidation[component.shortName]">{{message["min-choice-size"]}}</div></div></div><ion-list ng-if="isFormViewed"><ion-checkbox style="width: 100%" ng-repeat="option in component.options | filter : {type : \'Option\'}" ng-model="formData[component.shortName][option.key]" id="{{component.shortName+$index}}" name="{{component.shortName+$index}}" ng-true-value="\'{{option.name}}\'" ng-false-value="\'false\'" metadata="component.options" onclick="return false;">{{option.key}}</ion-checkbox></ion-list></div><div ng-switch-when="RadioButton"><div ng-repeat="option in component.options | filter : option.name = \'label\' | limitTo:1"><div ng-if="option.key!= \'\'" class="item item-divider">{{option.key}}</div></div><br><div ng-repeat="option in component.options | filter: { type: \'Option\'}" style="padding-left: 12px"><label><input type="radio" ng-value="option.name" ng-change="isInAdminFormPage && checkWhetherStringMatches(component.shortName)" ng-required="requiredValidation[component.shortName]" validation="component" metadata="component.options" name="name{{component.shortName}}" ng-disabled="isFormViewed" ng-model="formData[component.shortName]" event="component.events">&nbsp;&nbsp;{{option.key}}<br></label></div><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div><div ng-if="isInAdminFormPage" style="color: red" validation="component" ng-show="showCheckWhetherStringMatchesValidation(component.shortName) && formInf.mainForm.$submitted"><div ng-show="!checkStringMatchesValidation[component.shortName]">{{message["matched-validation"]}}</div></div></div><div ng-switch-when="SelectBox"><div class="list"><label class="item item-select"><div ng-repeat="option in component.options | filter : option.type = \'Label\' | limitTo:1"><div class="input-label">{{option.key}}</div></div><select ng-disabled="isFormViewed" name="name{{component.shortName}}" event="component.events" metadata="component.options" ng-required="requiredValidation[component.shortName]" ng-init="initializeComponentValue(component.shortName,\'\')" ng-change="isInAdminFormPage && checkWhetherStringMatches(component.shortName)" ng-model="formData[component.shortName]"><option value="" selected="">Seçiniz</option><option ng-repeat="option in component.options | filter : option.type = \'Option\'" value="{{option.name}}">{{option.key}}</option></select></label><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div><div ng-if="isInAdminFormPage" style="color: red" validation="component" ng-show="showCheckWhetherStringMatchesValidation(component.shortName) && formInf.mainForm.$submitted"><div ng-show="!checkStringMatchesValidation[component.shortName]">{{message["matched-validation"]}}</div></div></div></div><div ng-switch-when="MultiSelectBox" ng-init="checkName=component.shortName"><div class="list" validation="component"><a class="item item-icon-right" ng-click="openMultipleSelectModal(component)">&nbsp;{{getNumberOfSelectedOption(formData[component.shortName])}} <i class="icon ion-android-arrow-dropdown"></i></a><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div><div ng-if="isInAdminFormPage" style="color: red" ng-show="showValidationMessageOfMultiOptionComponent(component.shortName) && formInf.mainForm.$submitted"><div ng-show="!maxCheckValidation[component.shortName]">{{message["max-choice-size"]}}</div><div ng-show="!minCheckValidation[component.shortName]">{{message["min-choice-size"]}}</div></div></div></div><div ng-switch-when="BarcodeReader"><div class="item item-input-inset"><div class="row"><div class="col col-67"><label class="item"><input type="text" name="name{{component.shortName}}" ng-required="requiredValidation[component.shortName]" metadata="component.options" validation="component" ng-model="formData[component.shortName]" ng-readonly="isFormViewed"></label><div style="color: red" ng-messages="getFormValidations(form.shortName)[\'name\'+component.shortName].$error" ng-show="isInAdminFormPage && formInf.mainForm.$submitted"><div ng-message="required">{{message["required"]}}</div><div ng-message="minlength">{{message["ng-minlength"]}}</div><div ng-message="maxlength">{{message["ng-maxlength"]}}</div><div ng-message="ng-pattern">{{message["ng-pattern"]}}</div></div></div><div class="col col-33"><input type="button" tooltip-enable="isInAdminFormPage" uib-tooltip="{{ \'FORM_NOTSUPPORTED_MESSAGE\' | translate}}" class="button button-small {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}" style="width: 95%; float: right" value="{{buttonName[component.shortName]}}"></div></div></div></div><div ng-switch-when="Camera"><div metadata="component.options"></div><div class="upload-btn-wrapper"><button type="button" ng-click="!isInAdminFormPage && onTakePicture()" class="button button-block {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}">{{buttonName[component.shortName]}}</button> <input ng-disabled="!isInAdminFormPage" type="file" fileread="component" name="pic" accept="image/*"></div><div ng-show="formData[component.shortName].length>0" class="photobox"><ion-scroll overflow-scroll="false" zooming="false" direction="y" style="height: 15vh"><div ng-repeat="picture in formData[component.shortName] track by $index" ng-if="$index % 3 == 0" class="row"><div ng-if="formData[component.shortName][$index]" class="col-xs-4"><div class="gallery"><img ng-click="showPicture($index,component.shortName)" class="image" ng-src="{{imageURL +formData[component.shortName][$index].name}}"></div></div><div ng-if="formData[component.shortName][$index+1]" class="col-xs-4"><div class="gallery"><img data-ng-click="showPicture($index+1,component.shortName)" class="image" ng-src="{{imageURL +formData[component.shortName][$index+1].name}}"></div></div><div ng-if="formData[component.shortName][$index+2]" class="col-xs-4"><div class="gallery"><img data-ng-click="showPicture($index+2,component.shortName)" class="image" ng-src="{{imageURL +formData[component.shortName][$index+2].name}}"></div></div></div></ion-scroll></div><div ng-if="isInAdminFormPage" style="color: red" validation="component" ng-show="showCameraRequiredValidation(component.shortName) && formInf.mainForm.$submitted"><div>{{message["required"]}}</div></div></div><div ng-switch-when="DetailCamera"><div metadata="component.options"></div><button type="button" style="margin-bottom: auto" ng-disabled="!isInAdminFormPage" ng-click="onOpenDetailCameraModal(component)" class="button button-block {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}">{{buttonName[component.shortName]}}</button><div ng-show="formData[component.shortName].length>0" class="photobox"><ion-scroll overflow-scroll="false" zooming="false" direction="y" style="height: 15vh"><div ng-repeat="picture in formData[component.shortName] track by $index" ng-if="$index % 3 == 0" class="row"><div ng-if="formData[component.shortName][$index]" class="col-xs-4"><div class="gallery"><img class="resize_fit_center" ng-src="{{imageURL +formData[component.shortName][$index].name}}" data-ng-click="showPicture($index,component.shortName)"><div class="desc">{{formData[component.shortName][$index].description}}</div></div></div><div ng-if="formData[component.shortName][$index+1]" class="col-xs-4"><div class="gallery"><img class="resize_fit_center" ng-src="{{imageURL +formData[component.shortName][$index+1].name}}" data-ng-click="showPicture($index+1,component.shortName)"><div class="desc">{{formData[component.shortName][$index+1].description}}</div></div></div><div ng-if="formData[component.shortName][$index+2]" class="col-xs-4"><div class="gallery"><img class="resize_fit_center" ng-src="{{imageURL +formData[component.shortName][$index+2].name}}" data-ng-click="showPicture($index+2,component.shortName)"><div class="desc">{{formData[component.shortName][$index+2].description}}</div></div></div></div></ion-scroll></div><br><div ng-if="isInAdminFormPage" style="color: red" validation="component" ng-show="showCameraRequiredValidation(component.shortName) && formInf.mainForm.$submitted"><div>{{message["required"]}}</div></div></div><div ng-switch-when="Signature"><div class="signatureArea" tooltip-enable="isInAdminFormPage" uib-tooltip="{{ \'FORM_NOTSUPPORTED_MESSAGE\' | translate}}"><div class="signatureArea-header"><h6 class="signature-component-text">Signature</h6></div><div ng-if="formData[component.shortName].length > 0" class="signatureArea-image"><img height="250" ng-src="{{imageURL+ formData[component.shortName][0].name}}"></div><hr class="signatureArea-sign-hr"><br></div></div><div ng-switch-when="Video"><div metadata="component.options"></div><button type="button" style="margin-bottom: auto" tooltip-enable="isInAdminFormPage" uib-tooltip="{{ \'FORM_NOTSUPPORTED_MESSAGE\' | translate}}" class="button button-block {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}">{{buttonName[component.shortName]}}</button><div ng-show="formData[component.shortName].length>0" class="videobox"><div ng-repeat="video in formData[component.shortName] track by $index"><div class="report-video"><video width="100%" height="150" controls="controls" id="video"><source ng-src="{{imageURL + video.name}}" type="video/mp4"></video></div></div></div></div><div ng-switch-when="Image"><div style="text-align: center" ng-bind-html="createHTMLForImage(component.options)"></div></div><div ng-switch-when="Info" style="width: 100%"><div class="info-component"><span class="ion ion-information-circled info-component-icon" ng-click="isInAdminFormPage && openInformationModal(component.options)"></span></div></div><div ng-switch-default=""></div></div></div></div></ng-form></div>'), e.put("app/form-page/form-page.html", '<md-tabs md-selected="selectedIndex" md-border-bottom="" md-autoselect="" md-dynamic-height=""><md-tab md-no-ink="" ng-repeat="page in formStructure.pages" label="{{page.title}}"><div id="tpl-content" ng-include="\'app/form-page/component-page.html\'"></div></md-tab></md-tabs>'), e.put("app/modal/confirmDeleteModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="confirmForm"><div class="modal-body">{{modalMessage}}</div><div class="modal-footer"><button type="submit" set-focus-default="" class="btn btn-primary" ng-click="yes()">{{ \'CONFIRMDELETE_YES\' | translate }}</button> <button type="button" class="btn btn-danger" ng-click="no()">{{ \'CONFIRMDELETE_NO\' | translate }}</button></div></form></div>'), e.put("app/login/templates/404.html", '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blur Admin</title><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css"><link rel="stylesheet" href="styles/404-aff6a9433e.css"><link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon-96x96.png"></head><body><div class="page-not-found-modal"><h1>404 Error</h1><p>Sorry, that page doesn\'t exist. <a href="/">Go to Home Page.</a></p></div></body></html>'), e.put("app/login/templates/forgot-password.html", '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>INVISO</title><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&amp;subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css"><link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon-96x96.png"><link rel="stylesheet" href="styles/vendor-e4c9cc7eb4.css"><link rel="stylesheet" href="styles/auth-45047040a6.css"></head><body ng-app="BlurAdmin.login" ng-controller="forgotPasswordCTRL" class="block-position"><div class="auth-block"><h3 class="reset-header" translate="{{\'FORGOTPASSWORD_HEADER\'}}"></h3><br><div ng-if="messageError || messageSuccess"><div ng-class="{ \'center-block alert alert-danger\' : messageError,\'center-block alert alert-success\':messageSuccess}" ng-bind="message"></div></div><form name="forgetPasswordForm" ng-submit="sendResetKeyToUser()"><div class="form-group"><label for="inputPassword3" class="control-label" translate="{{\'LOGINPAGE_USERNAME\'}}"></label> <input type="text" ng-model="user.userName" class="form-control"></div><br><div class="form-group reset-buttons"><div><button type="button" ng-click="goToLoginPage()" class="btn btn-success reset-button ng-cloak" translate="{{\'CHANGEPASSWORD_CANCEL_BUTTON\'}}"></button></div><div class="reset-send-button ng-cloak" ng-if="messageSuccess"><button type="button" ng-click="goToLoginPage()" set-focus-default="" class="btn btn-primary reset-button" translate="{{\'CHANGEPASSWORD_NEXT_BUTTON\'}}"></button></div><div class="reset-send-button ng-cloak" ng-if="!messageSuccess"><button type="submit" ng-disabled="isMessageSent" set-focus-default="" class="btn btn-primary reset-button" translate="{{\'FORGOTPASSWORD_SEND_BUTTON\'}}"></button></div></div></form></div><script src="scripts/vendor-9858931b00.js"><\/script><script src="scripts/app-ba93d8fe54.js"><\/script></body></html>'), e.put("app/login/templates/index.html", '<!DOCTYPE html><html lang="tr" ng-app="BlurAdmin"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>INVISO</title><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&amp;subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css"><link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon-96x96.png"><link rel="stylesheet" href="styles/vendor-e4c9cc7eb4.css"><link rel="stylesheet" href="styles/app-e690ed5610.css"></head><body id="admin"><div class="body-bg"></div><main ng-if="$pageFinishedLoading" ng-class="{ \'menu-collapsed\': $baSidebarService.isMenuCollapsed() }"><ba-sidebar></ba-sidebar><page-top></page-top><div class="al-main"><div class="al-content"><content-top></content-top><div ui-view="" autoscroll="true" autoscroll-body-top=""></div></div></div><back-top></back-top></main><div id="preloader" ng-show="!$pageFinishedLoading"></div><script src="scripts/properties.js"><\/script><script src="scripts/vendor-9858931b00.js"><\/script><script src="scripts/app-ba93d8fe54.js"><\/script><script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"><\/script></body></html>'), e.put("app/login/templates/login.html", '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>INVISO</title><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&amp;subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css"><link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon-96x96.png"><link rel="stylesheet" href="styles/vendor-e4c9cc7eb4.css"><link rel="stylesheet" href="styles/auth-45047040a6.css"></head><body ng-app="BlurAdmin.login" ng-controller="LoginCTRL" class="block-position"><div class="auth-block"><div class="form-group"><img src="app/img/logo.png" class="auth-logo"></div><div ng-if="errorMessage!=\'\'"><div ng-bind="errorMessage" class="center-block alert alert-danger ng-cloak"></div></div><form ng-submit="login()" class="form-horizontal"><div class="form-group"><label for="inputEmail3" class="col-sm-3 control-label" translate="{{\'LOGINPAGE_USERNAME\'}}"></label><div class="col-sm-9"><input type="text" ng-model="userCredentials[\'username\']" name="username" class="form-control" id="inputEmail3"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-3 control-label" translate="{{\'LOGINPAGE_PASSWORD\'}}"></label><div class="col-sm-9"><input type="password" ng-model="userCredentials[\'password\']" class="form-control" name="password" id="inputPassword3" autocomplete="off"></div></div><div class="form-group"><div class="col-sm-offset-3 col-sm-6"><button type="submit" class="btn btn-success btn-auth pull-left ng-cloak" translate="{{ \'LOGINPAGE_SIGNUP\'}}"></button><select class="form-control language-select pull-left ng-cloak" ng-model="selectedLanguage" ng-change="changeLanguage()"><option value="tr" translate="{{ \'LOGINPAGE_LANGUAGESELECT_TR\'}}"></option><option value="en" translate="{{ \'LOGINPAGE_LANGUAGESELECT_EN\'}}"></option></select></div></div><a href="forgot-password.html" class="forgot-pass" translate="{{\'LOGIN_MODAL_FORGOTPASSWORD\'}}"></a></form></div><script src="scripts/vendor-9858931b00.js"><\/script><script src="scripts/app-ba93d8fe54.js"><\/script></body></html>'), e.put("app/login/templates/password.html", '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>INVISO</title><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&amp;subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css"><link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon-96x96.png"><link rel="stylesheet" href="styles/vendor-e4c9cc7eb4.css"><link rel="stylesheet" href="styles/auth-45047040a6.css"></head><body ng-app="BlurAdmin.password" ng-controller="PasswordCTRL" class="block-position"><div class="auth-block"><div ng-if="!isNewPasswordSaved"><h3 class="reset-header" translate="{{\'CHANGEPASSWORD_HEADER\'}}"></h3><br><br><div ng-if="message!=\'\'"><div class="center-block alert alert-danger ng-cloak" ng-bind="message"></div></div><form ng-submit="changePassword()" class="form-horizontal"><div class="form-group"><label class="control-label" translate="{{\'CHANGEPASSWORD_NEW\'}}"></label> <input type="password" ng-model="passwordDetail.newPassword" name="password" class="form-control" id="password" autocomplete="off"></div><div class="form-group"><label class="control-label" translate="{{\'CHANGEPASSWORD_VERIFY\'}}"></label> <input type="password" ng-model="passwordDetail.verifyPassword" name="password" class="form-control" id="password" autocomplete="off"></div><br><div class="form-group reset-buttons"><div><button type="button" ng-click="goToLoginPage()" class="btn btn-success reset-button ng-cloak" translate="{{\'CHANGEPASSWORD_CANCEL_BUTTON\'}}"></button></div><div class="reset-send-button"><button type="submit" ng-disabled="IsValid()" class="btn btn-success reset-button ng-cloak" translate="{{\'CHANGEPASSWORD_NEXT_BUTTON\'}}"></button></div></div></form></div><div ng-if="isNewPasswordSaved"><h5 class="reset-success-message" translate="{{\'CHANGEPASSWORD_SUCCESSMESSAGE\'}}"></h5><button type="button" ng-click="goToLoginPage()" class="btn btn-success btn-block" translate="{{\'CHANGEPASSWORD_NEXT_BUTTON\'}}"></button></div></div><script th:inline="javascript">\r\n/**/\r\n\r\n    var passwordKey  = [[${key}]];\r\n//     alert(passwordKey);\r\n\r\n/**/\r\n<\/script><script src="scripts/vendor-9858931b00.js"><\/script><script src="scripts/app-ba93d8fe54.js"><\/script></body></html>'), e.put("app/pages/change-password/change-password.html", '<div class="panel panel-default changePasswordPanel"><div class="panel-body"><form ng-submit="changePassword()" class="form-horizontal"><div class="form-group" ng-show="error.fillTheFields"><span class="changePassword-error-message">{{errorFillTheFields}}</span></div><div class="form-group"><label class="label-text" translate="{{\'CHANGEPASSWORD_OLD\'}}"></label> <input type="password" ng-model="password.old_password" ng-class="error.wrongPassword ? \'form-control verifyError\' : \'form-control\'" autocomplete="off"></div><div class="form-group" ng-show="error.wrongPassword"><span class="changePassword-error-message">{{errorWrongPasswordMessage}}</span></div><div class="form-group"><label class="label-text" translate="{{\'CHANGEPASSWORD_NEW\'}}"></label> <input type="password" ng-model="password.new_password" class="form-control" id="pwd" autocomplete="off"></div><div class="form-group"><label class="label-text" translate="{{\'CHANGEPASSWORD_VERIFY\'}}"></label> <input type="password" ng-model="password.verify_password" ng-class="error.notMatch ? \'form-control verifyError\' : \'form-control\'" autocomplete="off"></div><div class="form-group" ng-show="error.notMatch"><span class="changePassword-error-message">{{errorNotMatchMessage}}</span></div><div class="form-group"><div class="col-sm-offset-3 col-sm-6"><button type="submit" class="btn btn-success btn-block">{{\'CHANGE_BUTTON\' | translate}}</button></div></div></form></div></div>'), e.put("app/pages/dashboard/dashboard.html", '<div class="content-stretch"><dashboard-pie-chart></dashboard-pie-chart><div class="row bar-alignment"><div class="col-md-12 dashboard-panel-title"><div ba-panel="" ba-panel-title="{{\'DASHBOARD_BARCHAR_HEADER_FREE_FORM\' | translate}}" ba-panel-class="with-scroll"><h5 class="dashboard-h5" translate="DASHBOARD_BARCHAR_DESCRIPTION_FOR_FREE_FORM"></h5><div id="free-form-bar" class="ct-chart free-form-ct-chart"></div><br><div class="dashboard-description-completed-form"><div class="dashboard-description-free-form-completed-color-box"></div><div class="dashboard-description-completed-text">{{\'DASHBOARD_COMPLETE_FORM\' | translate}}</div></div></div></div></div></div>'), e.put("app/pages/forms/all-forms.html", '<div class="panel"><div class="panel-body"><div ng-if="userApplications.length == 0"><div class="not-found-error-color"><span class="ion ion-alert"></span><p>{{ \'FORM_ERRORMESSAGE_FORMSPAGE\' | translate}}</p></div></div><div id="preloader" ng-show="isLoading"><div></div></div><br><input type="text" class="form-control search-form" placeholder="{{ \'SEARCH_FORM_PLACEHOLDER\' | translate}}" ng-model="searchText"><br><div ng-if="!isLoading"><div class="list" data-ng-repeat="form in userForms | filter:{key:searchText}"><div class="card" ng-click="goFormPage(form)"><div class="item item-icon-right item-text-wrap"><h2>{{form.key}}</h2><i class="icon ion-arrow-right-b"></i></div></div></div></div></div></div>'), e.put("app/pages/forms/form.html", '<div id="preloader" ng-show="isLoadingOnFormPage"><div></div></div><div class="panel"><div class="panel-body"><button type="button" ng-disabled="\'true\'" ng-click="goBack()" class="btn btn-default"><i class="ion-arrow-left-c tab-top-icon"></i>&nbsp;{{ \'BACK_BUTTON\' | translate}}</button><div class="form_version_block">{{ \'FORM_VERSION_MENUTITLE\' | translate }} : {{selectedFormVersion}}</div><form id="pageForm" name="formInf.mainForm" class="form-style"><h3 align="center" ng-if="!page.isPageNameHide"><b>{{page.title}}</b></h3><div id="tpl-content" ng-include="\'app/form-page/component-page.html\'"></div></form></div></div><div ng-if="page.navigations.length != 0" class="tabs tabs-balanced"><div class="tab-item" ng-repeat="navigation in page.navigations"><div ng-if="navigation.functions.functionType.id == 3"><a ng-click="navigate(navigation)" class="form-tab-color" ng-disabled="disableTab">{{navigation.name}}</a></div><div ng-if="navigation.functions.functionType.id != 3"><a class="form-tab-color" ng-click="clickEvent(navigation.functions.functionDetail)">{{navigation.name}}</a></div></div></div>'), e.put("app/pages/loginModal/loginModal.html", '<div class="modal-content" ng-if="$pageFinishedLoading"><div class="modal-header" style="background-color:#209e91"><div>Login To Your Account</div></div><div class="modal-body"><br><br><form ng-submit="login()"><h6 style="color:red" ng-bind="errorMessage"></h6><div class="input-group"><span class="input-group-addon"><i style="color:black;" class="glyphicon glyphicon-user"></i></span> <input id="email" type="text" class="form-control" name="username" placeholder="{{\'LOGINPAGE_USERNAME\' | translate}}" ng-model="userCredentials[\'username\']"></div><div class="input-group"><span class="input-group-addon"><i style="color:black;" class="glyphicon glyphicon-lock"></i></span> <input id="password" type="password" class="form-control" ng-model="userCredentials[\'password\']" name="password" placeholder="{{\'LOGINPAGE_PASSWORD\' | translate}}" autocomplete="off"></div><br><button type="submit" class="btn btn-primary btn-block" translate="{{ \'LOGINPAGE_SIGNUP\'}}"></button></form><br><div style="padding-top:16px;padding-left:106px;"><span style="color:black;" ng-click="openForgotPasswordModal()" class="glyphicon glyphicon-lock"></span>&nbsp;{{\'LOGIN_MODAL_FORGOTPASSWORD\' | translate}}</div></div></div>'), e.put("app/pages/logout/logout.html", ""), e.put("app/pages/palette/application.html", '<div ng-controller="applicationCTRL"><div class="col-sm-4"><div class="panel panel-default" id="application-panel" ng-show="!isLoading"><div class="panel-heading">{{ \'APPLICATIONPAGE_FORMLISTNAME\' | translate }}</div><br><div style="text-align: center"><button type="button" ng-click="addNewApp()" class="btn btn-success">{{ \'APPLICATIONPAGE_ADDNEWFORMBUTTON\' | translate }}</button></div><br><div class="form-group row"><div class="col-sm-12" id="search-input"><input type="text" ng-model="applicationName" ng-change="search();" class="form-control application-search-input input-sm" id="search" placeholder="{{ \'APPLICATIONPAGE_APPSEARCH\' | translate }}"></div><div class="application-sortIcons"><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></div></div><br><ul class="list-group" ng-repeat="app in applications"><li style="background-color: #ededed" class="list-group-item application-listBox clearfix" ng-mouseleave="hoveringAppName=false" ng-mouseenter="hoveringAppName=true"><div id="application-name-text" ng-click="setAppInformation(app.value,$index)"><span title="{{app.key}}">{{app.key}}</span></div><span ng-show="hoveringAppName" id="application-open-icon" ng-click="onSelectedApp($index,app.value)">{{ \'APPLICATIONPAGE_OPENSELECTEDADPP\' | translate }}</span></li></ul><div class="table-pagination"><ul uib-pagination="" ng-change="getAppNames()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div><div class="col-sm-8" ng-show="showAppInformation"><div class="panel panel-default application-information-panel"><div class="panel-heading" id="application-information-panel-heading"><div id="application-information-panel-name-text">{{currentApp.name}}</div></div><div class="offset-height20"></div><div class="form-horizontal col-sm-10 col-sm-offset-1 clearfix"><div class="form-group well"><label for="applicationName" class="col-sm-3 control-label">{{ \'APPLICATIONPAGE_APPNAME\' | translate }} :</label><div class="col-sm-8"><input type="text" class="form-control" id="applicationName" ng-model="currentApp.name" ng-disabled="isDisabled"></div></div><div class="form-group well"><label for="applicationDescription" class="col-sm-3 control-label">{{ \'APPLICATIONPAGE_APPDESCRIPTION\' | translate }} :</label><div class="col-sm-8"><input type="text" class="form-control" id="applicationDescription" ng-model="currentApp.description" ng-disabled="isDisabled"></div></div><div class="form-group well"><label class="col-sm-3 control-label">{{ \'APPLICATIONPAGE_FORMTYPE\' | translate }}:</label><div class="col-sm-8"><div class="radio"><label><input type="radio" ng-model="currentApp.formType" name="optradio" value="0" ng-disabled="isDisabled">{{ \'APPLICATIONPAGE_FREEFORM\' | translate }}</label> <label><input type="radio" ng-model="currentApp.formType" name="optradio" value="1" ng-disabled="isDisabled">{{ \'APPLICATIONPAGE_ASSIGNMENTREQUIRED\' | translate }}</label></div></div></div><div class="form-group well"><div class="text-center">{{ \'APPLICATIONPAGE_APPCURRENTVERSION\' | translate }}: {{currentApp.version.version}}</div></div><div class="form-group well"><div class="text-center">{{ \'APPLICATIONPAGE_APPCREATEDAT\' | translate }}: {{currentApp.createdAt | date: \'dd-MM-yyyy h:m\'}}</div></div><div class="form-group well"><div class="text-center">{{ \'APPLICATIONPAGE_APPUPDATEDAT\' | translate }}: {{currentApp.updatedAt | date: \'dd-MM-yyyy h:m\'}}</div></div></div><div class="offset-height10"></div><div class="container-fluid"><div class="pull-right"><span ng-show="isUpdateButtonShowed.update"><button type="button" ng-click="updateApp()" class="btn btn-success">{{ \'APPLICATIONPAGE_APPUPDATE\' | translate }}</button></span> <span ng-show="isUpdateButtonShowed.save"><button type="button" ng-click="saveApp()" class="btn btn-success">{{ \'APPLICATIONPAGE_APPSAVE\' | translate }}</button></span> <span ng-show="isUpdateButtonShowed.save"><button type="button" ng-click="clearChangeOfApp()" class="btn btn-default">{{ \'APPLICATIONPAGE_APPCLEAR\' | translate }}</button></span> <button type="button" ng-click="deleteApp()" class="btn btn-danger">{{ \'APPLICATIONPAGE_APPDELETE\' | translate }}</button></div></div><div class="offset-height10"></div></div></div></div>'), e.put("app/pages/palette/indexPalette.html", '<div id="tpl-content" ng-include="currentTpl"></div>'), e.put("app/pages/palette/palette.html", '<div ng-controller="paletteCTRL"><div class="page-header clearfix"><h4>{{currentApp.name}}<div class="pull-right palette-button-top"><button ng-disabled="isLoading" type="button" ng-click="saveApplication()" class="btn btn-success"><i class="ion-archive tab-top-icon"></i> {{ \'PALETTE_SAVE\' | translate }}</button> <button type="button" ng-click="goBackAppList()" class="btn btn-default"><i class="ion-arrow-left-c tab-top-icon"></i> {{ \'BACK_BUTTON\' | translate }}</button></div></h4></div><div class="clearfix"></div><div class="col-md-3"><div class="panel panel-default panel-palette"><div class="panel-heading panel-header">{{ \'PALETTE_PALETTE\' | translate }}</div><div class="palette-header">Main</div><div class="panel-body"><div class="row panel-palette-row"><div class="col-xs-6 text-center"><div class=""><div draggable="true" class="panel-palette-img-form-position" ondragstart="angular.element(this).scope().drag(event)" id="form"><img src="app/img/section.svg" height="36" width="36"></div><br><p>Section</p></div></div><div class="col-xs-6 text-center"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="grid"><img src="app/img/grid.svg" height="36" width="36"></div><br><p>Grid</p></div></div><div class="col-xs-12 text-center"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="tab"><img src="app/img/tab.svg" height="36" width="36"></div><br><p>Navigation</p></div></div></div></div><div class="palette-header clearfix">Sub</div><div class="panel-body"><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="TextBox"><img src="app/img/input.svg" height="36" width="36"></div><br><p>Input</p></div></div><div class="col"><div class="panel-palette-img-position"><div class="panel-palette-img-button-position" draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Button"><img src="app/img/button.svg" height="36" width="36"></div><br><p>Button</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-textarea-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="TextArea"><img src="app/img/textarea.svg" height="36" width="36"></div><br><p>TextArea</p></div></div><div class="col"><div class="panel-palette-img-position"><div class="panel-palette-img-text-position" draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Text"><img src="app/img/static-label.svg" height="36" width="36"></div><br><p>StaticText</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-multiselect-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="MultiSelectBox"><img src="app/img/multi-select.png" height="36" width="36"></div><br><p>MultiSelect</p></div></div><div class="col"><div class="panel-palette-img-select-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="SelectBox"><img src="app/img/combo-box.svg" height="36" width="36"></div><br><p>SelectBox</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-checkbox-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="CheckBox"><img src="app/img/checkbox.svg" height="36" width="36"></div><br><p>Checkbox</p></div></div><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="RadioButton"><img src="app/img/radiobutton.svg" height="36" width="36"></div><br><p>RadioButton</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-camera-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Camera"><img src="app/img/camera.svg" height="36" width="36"></div><br><p>Camera</p></div></div><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="DetailCamera"><img src="app/img/photo-information.svg" height="36" width="36"></div><br><p>Camera & Note</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Info"><img src="app/img/information.svg" height="36" width="36"></div><br><p>Info</p></div></div><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="BarcodeReader"><img src="app/img/barcode.svg" height="36" width="36"></div><br><p>BarcodeReader</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Video"><img src="app/img/video-icon.svg" height="36" width="36"></div><br><p>Video</p></div></div><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Signature"><img src="app/img/signature-icon.svg" height="36" width="36"></div><br><p>Signature</p></div></div></div><hr><div class="row panel-palette-row"><div class="col"><div class="panel-palette-img-position"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="Image"><img src="app/img/image.svg" height="36" width="36"></div><br><p>Image</p></div></div><div class="col"></div></div></div></div></div><div class="col-md-9 col-lg-7"><div class="panel panel-default" style="max-height: 70vh; overflow-y: auto"><div class="panel-body form-style"><md-tabs md-selected="selectedIndex" md-border-bottom="" md-autoselect="" md-dynamic-height=""><md-tab md-no-ink="" ng-repeat="appPage in currentApp.pages" ng-disabled="appPage.disabled" md-on-select="setCurrentPage(appPage); setPageProperties(propertiesUrl.page,$index);"><md-tab-label><input id="palette-page-header" title="{{appPage.title}}" ng-model="appPage.title" type="text"></md-tab-label><md-tab-body><div ondrop="angular.element(this).scope().dropOnPage(event)" ondragover="angular.element(this).scope().dragOver(event)" ng-click="setPageProperties(propertiesUrl.page,$index)" class="demo-tab tab{{$index%4}} palette-page" id="page"><div ondrop="angular.element(this).scope().dropOnBreakBetweenForms(event)" id="0#formBreak" ondragleave="angular.element(this).scope().dragLeaveOnBreakBetweenForms(event)" ng-keydown="pasteForm($event,0)" ng-click="$event.stopPropagation()" ondragover="angular.element(this).scope().dragOverBreakForms(event)" class="palette-form-break"></div><div ng-repeat="form in appPage.forms track by $index"><h4 ng-if="form.title != \'\'" align="center"><b>{{form.title}}</b></h4><div ng-click="setSelectedForm(form,$index,$event)" ng-keydown="keyDownForm($event,form)" draggable="true" ondragstart="angular.element(this).scope().drag(event)" ondragleave="angular.element(this).scope().dragLeaveForm(event)" id="{{$index}}#form" ondrop="angular.element(this).scope().dropOnForm(event)" ondragover="angular.element(this).scope().dragOverForm(event)" ng-class="$index == selectedFormIndex && isFormSelected ? \'click-palette-form\' : \'palette-form\'"><div ng-repeat="row in form.rows track by $index"><div ondrop="angular.element(this).scope().dropOnBreakBetweenRows(event)" id="{{$parent.$index}}#{{$index}}#rowBreak" ondragleave="angular.element(this).scope().dragLeaveOnBreakBetweenRows(event)" ondragover="angular.element(this).scope().dragOverBreakRows(event)" ng-click="setSelectedForm(form,$parent.$index,$event)" ng-keydown="pasteRow($event,$parent.$index,$index)" class="palette-row-break"></div><div class="row"><div class="col col-90"><div id="{{$parent.$index}}#{{$index}}#row" class="row palette-row" style="margin-left: 0px;" ng-keydown="keyDownRow($event,row)" draggable="true" ondragstart="angular.element(this).scope().drag(event)" ng-mouseenter="hoverRow=true" ng-mouseleave="hoverRow=false" ng-click="$event.stopPropagation();setRowProperties($parent.$index,$index);" ng-class="$index == selectedRowIndex && $parent.$index == selectedFormIndex && isRowSelected ? \'click-palette-row\' : \'palette-row\'"><div title="{{component.shortName}}" class="col {{component.colSize}} palette-col" id="{{$parent.$parent.$index}}#{{$parent.$index}}#{{$index}}#column" ng-repeat="component in row.components track by $index" draggable="true" ondragstart="angular.element(this).scope().drag(event)" ondrop="angular.element(this).scope().dropOnColumn(event)" ondragover="angular.element(this).scope().dragOverColumn(event)" ondragleave="angular.element(this).scope().dragLeaveColumn(event)" ng-keydown="keyDownColumn($event,component)" ng-click="$event.stopPropagation();setColumn($parent.$parent.$index,$parent.$index,$index,component);" ng-class="$index == selectedColumnIndex && $parent.$parent.$index == selectedFormIndex && $parent.$index == selectedRowIndex && isColumnSelected ? \'click-palette-col\' : \'palette-col\'"><div ng-click="setSelectedComponentProperties($event,component)" ng-keydown="keyDownComponent($event,component)" ng-include="" src="component.type" ng-if="component.type!= \'EmptyComponent\'"></div></div><a ng-click="addColumn($parent.$index,$index)"><span ng-class="{\'icon ion-plus row-properties-add-icon\': $index == selectedRowIndex && $parent.$index == selectedFormIndex && isRowSelected}"></span></a> <a ng-click="deleteSelectedColumn($parent.$index,$index)"><span ng-class="{\'icon ion-minus row-properties-delete-icon\': $index == selectedRowIndex && $parent.$index == selectedFormIndex && isRowSelected}"></span></a></div></div><div class="col col-center"><a ng-click="addRow($parent.$index,$index)"><span class="icon ion-ios-plus-outline add-new-row-icon"></span></a> <span>&nbsp;&nbsp;</span> <a ng-click="deleteRow($parent.$index,$index)"><span class="icon ion-ios-minus-outline add-new-row-icon"></span></a></div></div></div><div ondrop="angular.element(this).scope().dropOnBreakBetweenRows(event)" id="{{$index}}#lastRowBreak" ondragleave="angular.element(this).scope().dragLeaveOnBreakBetweenRows(event)" ondragover="angular.element(this).scope().dragOverBreakRows(event)" ng-click="setSelectedForm(form,$index,$event)" ng-keydown="pasteRow($event,$index)" class="palette-row-break"></div></div><div ondrop="angular.element(this).scope().dropOnBreakBetweenForms(event)" id="{{$index+1}}#formBreak" ondragleave="angular.element(this).scope().dragLeaveOnBreakBetweenForms(event)" ng-keydown="pasteForm($event,$index+1)" ng-click="setPageProperties(propertiesUrl.page,$parent.$index)" ondragover="angular.element(this).scope().dragOverBreakForms(event)" class="palette-form-break"></div></div><br><br><div ng-show="currentPage.navigations.length > 0"><div class="tabs tabs-balanced" ng-click="setTabProperties($event,propertiesUrl.tab)"><a class="tab-item navigation-tab" ng-repeat="item in currentPage.navigations">{{item.name}}</a></div></div><br></div></md-tab-body></md-tab><md-tab ng-disabled="" md-on-select="addNewPage()"><span class="ion-plus-circled new-page-tab"></span></md-tab></md-tabs></div></div></div><div class="col-md-3 col-lg-2"><div class="panel panel-default panel-properties" ng-show="isComponentClicked"><div class="panel-heading panel-header panel-properties__header"><small>{{ \'PALETTE_PROPERTIES\' | translate }}-{{entity.name}}</small></div><div ng-include="" src="properties.template"></div></div></div><script type="text/ng-template" id="Button"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-button\': \'palette-button\'"> <button class="button {{componentOptions[component.shortName].size}} {{componentOptions[component.shortName].color}} {{componentOptions[component.shortName].style}}"> {{componentOptions[component.shortName].value}}</button> </div><\/script><script type="text/ng-template" id="TextBox"><div ng-init="setDescriptionToTextBox(component)"></div> <div ng-repeat="option in component.options"> <div ng-if="option.name == \'isUnique\'"> <div ng-init="setUniqueCount(option)"></div> </div> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component item item-input item-stacked-label\' : \'item item-input item-stacked-label\' "> <input class="ionic-input" style="cursor:pointer" type="{{componentOptions[component.shortName].type}}" placeholder="{{componentOptions[component.shortName].placeholder}}" ng-value="componentOptions[component.shortName].textValue" disabled> </div><\/script><script type="text/ng-template" id="Text"><div ng-init="componentOptions[component.shortName][\'key\']= component.options[0].key"></div> <div ng-init="componentOptions[component.shortName][\'name\']= component.options[0].name"></div> <div ng-init="initializeTextComponentOptions(component,componentOptions)"></div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-text-component\' : \'palette-text-component\'"> <p ng-style="setTextSizeStyle(componentOptions[component.shortName][\'font-size\'])" ng-if="componentOptions[component.shortName].bold == \'false\' || !componentOptions[component.shortName].bold" ng-class="controlTextComponent(componentOptions,component.shortName) ? \'text-empty\' : \'text-not-empty\'"> {{componentOptions[component.shortName].key}}</p> <p ng-style="setTextSizeStyle(componentOptions[component.shortName][\'font-size\'])" ng-if="componentOptions[component.shortName].bold == \'true\'" ng-class="controlTextComponent(componentOptions,component.shortName) ? \'text-empty\' : \'text-not-empty\'" ng-bind-html="\'<b>\'+ componentOptions[component.shortName].key +\'</b>\'"> </p> </div><\/script><script type="text/ng-template" id="TextArea"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component item item-input\' : \'item item-input\' "> <textarea class="ionic-input" rows="componentOptions[component.shortName].placeholder.rows" cols="componentOptions[component.shortName].placeholder.cols" placeholder="{{componentOptions[component.shortName].placeholder}}" disabled>{{componentOptions[component.shortName].textValue}}</textarea> </div><\/script><script type="text/ng-template" id="CheckBox"><div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-checkbox\' : \'palette-checkbox\'"> <div ng-repeat="option in component.options track by $index" > <div ng-if="option.type == \'Label\' && option.key!=\'\' " ng-class="{\'click-palette-component\' : componentSelected[component.shortName] && isComponentSelected}" > <div class="item item-divider">{{option.key}}</div> </div> <div ng-if="option.type == \'Option\'"> <ul class="list" style="overflow:hidden"> <li class="item item-checkbox"> {{option.key}} <label class="checkbox palette-checkbox-label"> <input type="checkbox"> </label> </li> </ul> </div> </div> </div><\/script><script type="text/ng-template" id="RadioButton"><div ng-repeat="option in component.options | filter : { type : \'Label\'}" style=" padding-left: 1px;"> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-radio-header item item-divider \' : \'item palette-radio-header item-divider\'">{{option.key}}</div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-radio-border\' : \'palette-radio-border\'"> <br/> <div ng-repeat="option in component.options | filter: { type: \'Option\'}"> <label class="palette-radio-label"> <input class="palette-radio" type="radio" name="radioValue" >&nbsp;&nbsp;{{option.key}}<br/> </label> <div ng-if="$index != component.options.length -2 "> <hr> </div> </div> </div><\/script><script type="text/ng-template" id="SelectBox"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component item item-select\' : \'item item-select\'"> <div ng-repeat="option in component.options | filter:{type:\'Label\'} track by $index" > <div class="input-label">{{option.key}}</div> </div> <select ng-options="option.name as option.key for option in component.options | filter : option.type = \'Option\' " ng-model="selectBoxValue[component.shortName]"> </select </div><\/script><script type="text/ng-template" id="MultiSelectBox"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-multiSelect\' : \'palette-multiSelect\'"> <a class="item"> <div class="palette-multiSelect-text" ng-click="openMultipleSelectModal(component)">{{\'PALETTE_MULTISELECT_TEXT\' | translate }}</div> <i class="icon ion-android-arrow-dropdown palette-multiSelect-icon" ></i> </a> </div><\/script><script type="text/ng-template" id="BarcodeReader"><div ng-repeat="option in component.options"> <div ng-if="option.name == \'isUnique\'"> <div ng-init="setUniqueCount(option)"></div> </div> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-barcode\' : \'palette-barcode\' "> <div class="item item-input-inset palette-barcode-item " > <div class="row"> <div class="col col-67"> <label class="item-input-wrapper"> <input class="ionic-input " type="text" name="barcodeInput"> </label> </div> <div class="col"> <button class="button {{componentOptions[component.shortName].color}} {{componentOptions[component.shortName].style}} ">{{componentOptions[component.shortName].buttonName}}</button> </div> </div> </div> <div><\/script><script type="text/ng-template" id="Camera"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-camera\' : \'palette-camera\'"> <button class="button button-block {{componentOptions[component.shortName].color}} {{componentOptions[component.shortName].style}}" >{{componentOptions[component.shortName].buttonName}}</button> <div><\/script><script type="text/ng-template" id="Video"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-camera\' : \'palette-camera\'"> <button class="button button-block {{componentOptions[component.shortName].color}} {{componentOptions[component.shortName].style}}" >{{componentOptions[component.shortName].buttonName}}</button> <div><\/script><script type="text/ng-template" id="DetailCamera"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-camera\' : \'palette-camera\'"> <button class="button button-block {{componentOptions[component.shortName].color}} {{componentOptions[component.shortName].style}}" >{{componentOptions[component.shortName].buttonName}}</button> <div><\/script><script type="text/ng-template" id="Info"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component palette-info\' : \'palette-info\' "> <span style="font-size: 18px;padding:25px" class="ion ion-information-circled"></span> </div><\/script><script type="text/ng-template" id="Image"><div ng-repeat="option in component.options"> <div ng-init="componentOptions[component.shortName][option.name]=option.key"></div> </div> \x3c!-- imageURL + --\x3e <div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component \' : \'\'"> <img ng-if="!componentOptions[component.shortName].imageSource" width=30 height=30 src="app/img/image.svg"> <img ng-if="componentOptions[component.shortName].imageSource" width="{{componentOptions[component.shortName].imageWidth}}" height="{{componentOptions[component.shortName].imageHeight}}" ng-src="{{ componentOptions[component.shortName].imageSource}}"> </div><\/script><script type="text/ng-template" id="Signature"><div ng-class="componentSelected[component.shortName] && isComponentSelected ? \'click-palette-component \' : \'\'"> <div class="row signatureArea-margin" > <div class="signatureArea"> <div class="signatureArea-header"> <h6>Signature</h6> </div> <hr class="signatureArea-sign-hr" /> <br/> </div> </div> <div><\/script><script type="text/ng-template" id="/columnProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Width</small></td> <td><small> <select ng-model="componentOptions.component.colSize" class="form-control "> <option value="col">None</option> <option value="col-10">10</option> <option value="col-20">20</option> <option value="col-25">25</option> <option value="col-33">33</option> <option value="col-50">50</option> <option value="col-67">67</option> <option value="col-75">75</option> <option value="col-80">80</option> <option value="col-90">90</option> </select> </small></td> </tr> <tr> <td><small>Short Name</small></td> <td> <div class="componentShortName-column"> <small>name{{componentOptions.component.shortName}}</small> </div> </td> </tr> <tr> <td colspan="2" id="properties-delete-button"><small><button type="button" ng-click="deleteColumn()" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/buttonProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Text</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].value}}" ng-model="componentOptions[componentOptions.component.shortName].value" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Color</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].color" class="form-control "> <option value=" ">None</option> <option value="button-stable">Stable</option> <option value="button-positive">Positive</option> <option value="button-calm">Calm</option> <option value="button-balanced">Balanced</option> <option value="button-energized">Energized</option> <option value="button-assertive">Assertive</option> <option value="button-royal">Royal</option> <option value="button-dark">button-dark</option> </select> </small></td> </tr> <tr> <td><small>Size</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].size" class="form-control "> <option value="">None</option> <option value="button-small">Small</option> <option value="button-large">Large</option> <option value="button-full">Full</option> <option value="button-block">Block</option> </select> </small></td> </tr> <tr> <td><small>Style</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].style" class="form-control "> <option value="">None</option> <option value="button-outline">Outline</option> <option value="button-clear">Clear</option> </select> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)" >{{ \'PALETTE_ADDVALIDATION\' | translate }}</a></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a> \x3c!-- <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDEVENTLINK\' | translate}}"></a> --\x3e </small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/textProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Container</small></td> <td id="properties-td-input"><small> <select ng-change="setTextComponentOptions(componentOptions)" class="form-control" ng-model="componentOptions[componentOptions.component.shortName].name" > <option value="label">label</option> <option value="paragraph">p</option> </select> </small></td> </tr> <tr> <td><small>Text</small></td> <td ng-if="!setTextEditor(componentOptions[componentOptions.component.shortName].name)"><small><a ng-click="openTextContentEditor(componentOptions)">Content</a></small></td> <td ng-if="setTextEditor(componentOptions[componentOptions.component.shortName].name)" id="properties-td-input"> <small> <input ng-change="setTextComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].key}}" ng-model="componentOptions[componentOptions.component.shortName].key" type="text" class="form-control"> </small> </td> </tr> <tr> <td><small>Bold</small></td> <td> <small><input type="checkbox" ng-true-value="\'true\'" ng-change="setTextStyle(componentOptions);" ng-model="componentOptions[componentOptions.component.shortName].bold"> </small> </td> </tr> <tr> <td><small>Italic</small></td> <td> <small><input type="checkbox" ng-true-value="\'true\'" ng-change="setTextStyle(componentOptions);" ng-model="componentOptions[componentOptions.component.shortName].italic"> </small> </td> </tr> <tr> <td><small>Underline</small></td> <td> <small><input type="checkbox" ng-true-value="\'true\'" ng-change="setTextStyle(componentOptions);" ng-model="componentOptions[componentOptions.component.shortName].underline"> </small> </td> </tr> <tr> <td><small>Size</small></td> <td> <small><input type="number" class="form-control" ng-change="setTextStyle(componentOptions);" ng-model="componentOptions[componentOptions.component.shortName][\'font-size\']"> </small> </td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/inputProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Placeholder</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].placeholder}}" ng-model="componentOptions[componentOptions.component.shortName].placeholder" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Text</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" title="{{componentOptions[componentOptions.component.shortName].textValue}}" ng-model="componentOptions[componentOptions.component.shortName].textValue" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].alias}}" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Type</small></td> <td> <small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].type" class="form-control "> <option ng-selected="type.value == componentOptions[componentOptions.component.shortName].type" ng-repeat="type in inputTypes" value="{{type.value}}">{{type.value}}</option> </select> </small> </td> </tr> <tr> <td><small>Unique <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="bottom" uib-tooltip="{{\'TOOLTIP_PALETTE_PROPERTIES_UNIQUE\' | translate}}"></a> </small></td> <td><small><input type="checkbox" ng-true-value="\'true\'" ng-change="setComponentOptions(componentOptions);changeUniqueCount(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].isUnique"> </small></td> </tr> <tr> <td><small>Readonly</small></td> <td><small><input type="checkbox" ng-true-value="\'true\'" ng-change="setComponentOptions(componentOptions);" ng-model="componentOptions[componentOptions.component.shortName].readonly"></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.NOTIFICATION)">{{ \'PALETTE_ADDNOTIFICATION\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/pageProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Title</small></td> <td id="properties-td-input"><small><input ng-model="currentPage.title" type="text" title="{{currentPage.title}}" class="form-control"></small></td> </tr> <tr> <td><small>Hide Page Name</small></td> <td><small><input type="checkbox" ng-model="currentPage.isPageNameHide"></small></td> </tr> <tr> <td><small>HomePage</small></td> <td><small><input type="checkbox" ng-model="currentPage.homePage" ng-change="setHomePage(currentPage.shortName)"></small></td> </tr> <tr> <td><small>Page Number</small></td> <td id="properties-td-input"><small><input type="number" ng-model="currentPage.pageNumber" class="form-control"></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deletePage()" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/formProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Title</small></td> <td id="properties-td-input"><small><input ng-model="selectedForm.properties.title" title="{{selectedForm.properties.title}}" type="text" class="form-control"></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteForm()" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/textAreaProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Placeholder</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].placeholder}}" ng-model="componentOptions[componentOptions.component.shortName].placeholder" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Text</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].textValue}}" ng-model="componentOptions[componentOptions.component.shortName].textValue" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].textValue}}" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Rows</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].rows}}" ng-model="componentOptions[componentOptions.component.shortName].rows" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Cols</small></td> <td id="properties-td-input"><small><input ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].cols}}" ng-model="componentOptions[componentOptions.component.shortName].cols" type="text" class="form-control"></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/checkboxProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Header</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].label}}" ng-model="componentOptions[componentOptions.component.shortName].label" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].alias}}" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Options</small></td> <td id="properties-td-input"><small> <span ng-click="addNewOption(componentOptions)" class="icon ion-ios-plus-empty"></span> <span ng-click="setOptionSectionShow(!isOptionSectionOpened);" ng-class="!isOptionSectionOpened ? \'ion-arrow-up-b\' : \'ion-arrow-down-b\' "></span> </small></td> </tr> <tr ng-show="isOptionSectionOpened" ng-repeat="option in componentOptions.component.options | filter:{type:\'Option\'}"> <td id="properties-td-input"><small><input title="{{option.key}}" type="text" placeholder="Text" ng-blur="setValueProperties(option)" class="form-control" ng-model="option.key"></small></td> <td id="properties-td-input"><small> <input type="text" placeholder="Value" title="{{option.name}}" ng-blur="validateValue(option)" class="form-control" ng-model="option.name"> <span id="option-delete-icon" class="ion-ios-minus-empty" ng-click="deleteOptionTab($index)"></span> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/radioButtonProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Header</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].label}}" ng-model="componentOptions[componentOptions.component.shortName].label" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].alias}}" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Options</small></td> <td id="properties-td-input"><small> <span ng-click="addNewOption(componentOptions)" class="icon ion-ios-plus-empty"></span> <span ng-click="setOptionSectionShow(!isOptionSectionOpened);" ng-class="!isOptionSectionOpened ? \'ion-arrow-up-b\' : \'ion-arrow-down-b\' "></span> </small></td> </tr> <tr ng-show="isOptionSectionOpened" ng-repeat="option in componentOptions.component.options | filter:{type:\'Option\'}"> <td id="properties-td-input"><small><input type="text" title="{{option.key}}" placeholder="Text" ng-blur="setValueProperties(option)" class="form-control" ng-model="option.key"></small></td> <td id="properties-td-input"><small> <input type="text" placeholder="Value" title="{{option.name}}" class="form-control" ng-blur="validateValue(option)" ng-model="option.name"> <span id="option-delete-icon" class="ion-ios-minus-empty" ng-click="deleteOptionTab($index)"></span> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/selectBoxProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Header</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].label}}" ng-model="componentOptions[componentOptions.component.shortName].label" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].alias}}" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Datasource</small></td> <td><small> <select ng-model="componentOptions.component.datasourceType" ng-options="option.value as option.name for option in datasourceOptions" ng-change="setComponentDataSource(componentOptions,\'{{componentOptions.component.datasourceType}}\');" class="form-control "> </select> </small> </td> </tr> <tr ng-if="componentOptions.component.datasourceType"> <td><small>Endpoints</small></td> <td><small> <select ng-options="ep.id as ep.name for ep in allEndpoints" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].datasource" class="form-control " string-to-number></select> </small> </td> </tr> <tr ng-if="!componentOptions.component.datasourceType"> <td><small>Options</small></td> <td id="properties-td-input"><small> <span ng-click="addNewOption(componentOptions)" class="icon ion-ios-plus-empty"></span> <span ng-click="setOptionSectionShow(!isOptionSectionOpened);" ng-class="!isOptionSectionOpened ? \'ion-arrow-up-b\' : \'ion-arrow-down-b\' "></span> </small></td> </tr> <tr ng-if="!componentOptions.component.datasourceType" ng-show="isOptionSectionOpened" ng-repeat="option in componentOptions.component.options | filter:{type:\'Option\'}"> <td id="properties-td-input"><small><input type="text" title="{{option.key}}" placeholder="Text" class="form-control" ng-blur="setValueProperties(option)" ng-model="option.key"></small></td> <td id="properties-td-input"><small> <input type="text" title="{{option.name}}" placeholder="Value" class="form-control" ng-blur="validateValue(option)" ng-model="option.name"> <span id="option-delete-icon" class="ion-ios-minus-empty" ng-click="deleteOptionTab($index)"></span> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/multiSelectBoxProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Header</small></td> <td id="properties-td-input"><small><input title="{{componentOptions.component.options[0].key}}" ng-model="componentOptions.component.options[0].key" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td id="properties-td-input"><small><input ng-disabled="setDisabled(componentOptions[componentOptions.component.shortName].type)" ng-change="setComponentOptions(componentOptions)" title="{{componentOptions[componentOptions.component.shortName].alias}}" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Options</small></td> <td id="properties-td-input"><small> <span ng-click="addNewOption(componentOptions)" class="icon ion-ios-plus-empty"></span> <span ng-click="setOptionSectionShow(!isOptionSectionOpened);" ng-class="!isOptionSectionOpened ? \'ion-arrow-up-b\' : \'ion-arrow-down-b\' "></span> </small></td> </tr> <tr ng-show="isOptionSectionOpened" ng-repeat="option in componentOptions.component.options | filter:{type:\'Option\'}"> <td id="properties-td-input"><small><input type="text" title="{{option.key}}" placeholder="Text" class="form-control" ng-blur="setValueProperties(option)" ng-model="option.key"></small></td> <td id="properties-td-input"><small> <input type="text" placeholder="Value" title="{{option.name}}" class="form-control" ng-blur="validateValue(option)" ng-model="option.name"></small> <span id="option-delete-icon" class="ion-ios-minus-empty" ng-click="deleteOptionTab($index)"></span> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addEvents(componentOptions)">{{ \'PALETTE_ADDEVENT\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/barcodeProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Button Text</small></td> <td><small><input title="{{componentOptions[componentOptions.component.shortName].buttonName}}" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].buttonName" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Alias</small></td> <td><small><input title="{{componentOptions[componentOptions.component.shortName].alias}}" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].alias" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Color</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].color" class="form-control "> <option value=" ">None</option> <option value="button-stable">Stable</option> <option value="button-positive">Positive</option> <option value="button-calm">Calm</option> <option value="button-balanced">Balanced</option> <option value="button-energized">Energized</option> <option value="button-assertive">Assertive</option> <option value="button-royal">Royal</option> <option value="button-dark">Button-dark</option> </select> </small></td> </tr> <tr> <td><small>Style</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].style" class="form-control "> <option value="">None</option> <option value="button-outline">Outline</option> <option value="button-clear">Clear</option> </select> </small></td> </tr> <tr> <td><small>Unique <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="bottom" uib-tooltip="{{\'TOOLTIP_PALETTE_PROPERTIES_UNIQUE\' | translate}}"></a> </small></td> <td><small><input type="checkbox" ng-change="setComponentOptions(componentOptions);changeUniqueCount(componentOptions)" ng-true-value="\'true\'" ng-model="componentOptions[componentOptions.component.shortName].isUnique"></small></td> </tr> <tr> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/cameraProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Button Text</small></td> <td><small><input title="{{componentOptions[componentOptions.component.shortName].buttonName}}" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].buttonName" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Color</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].color" class="form-control "> <option value=" ">None</option> <option value="button-stable">Stable</option> <option value="button-positive">Positive</option> <option value="button-calm">Calm</option> <option value="button-balanced">Balanced</option> <option value="button-energized">Energized</option> <option value="button-assertive">Assertive</option> <option value="button-royal">Royal</option> <option value="button-dark">button-dark</option> </select> </small></td> </tr> <tr> <td><small>Style</small></td> <td><small> <select ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].style" class="form-control "> <option value="">None</option> <option value="button-outline">Outline</option> <option value="button-clear">Clear</option> </select> </small></td> </tr> <tr ng-if="componentOptions.component.type != \'Video\'"> <td colspan="2"><small><a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a> </small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/tabProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Tabs</small></td> <td id="properties-td-input"><small> <span ng-click="addNewTab()" class="icon ion-ios-plus-empty"></span> <span ng-click="setOptionSectionShow(!isOptionSectionOpened);" ng-class="!isOptionSectionOpened ? \'ion-arrow-up-b\' : \'ion-arrow-down-b\' "></span> </small></td> </tr> <tr ng-show="isOptionSectionOpened" ng-repeat="navigation in currentPage.navigations "> <td><small><a ng-click="addFunction(navigation)">{{ \'PALETTE_TABFUNCTION\' | translate }}</a></small></td> <td id="properties-td-input"> <small> <input type="text" placeholder="Text" class="form-control" title="{{navigation.name}}" ng-model="navigation.name"> <span id="option-delete-icon" class="ion-ios-minus-empty" ng-click="deleteNavigationTabItem($index)"></span></small> </td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteNavigationTab()" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/infoProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small><a ng-click="openInfoEditor(componentOptions)">{{ \'PALETTE_INFOCONTENT\' | translate }}</a></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/signatureProperties.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td colspan="2"><small> <a ng-click="addValidation(componentOptions,validationType.VALIDATION)">{{ \'PALETTE_ADDVALIDATION\' | translate }}</a></small></td> </tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><script type="text/ng-template" id="/image.html"><table class="table table-bordered table-hover properties"> <tbody> <tr> <td><small>Source</small></td> <td><small><input id="imageLink" title="{{componentOptions[componentOptions.component.shortName].imageSource}}" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].imageSource" type="text" class="form-control"></small><small><input type="file" id="paletteImageUpload" accept="image/*" onChange="paletteImageUpload()"></small></td> </tr> <tr> <td><small>Width</small></td> <td><small><input title="{{componentOptions[componentOptions.component.shortName].imageWidth}}" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].imageWidth" type="text" class="form-control"></small></td> </tr> <tr> <td><small>Height</small></td> <td><small><input title="{{componentOptions[componentOptions.component.shortName].imageHeight}}" ng-change="setComponentOptions(componentOptions)" ng-model="componentOptions[componentOptions.component.shortName].imageHeight" type="text" class="form-control"></small></td> </tr> <tr> <tr> <td colspan="2" id="properties-delete-button"><button type="button" ng-click="deleteComponent(componentOptions)" class="btn btn-success btn-block btn-xs">{{ \'PALETTE_DELETE\' | translate }}</button><small></small></td> </tr> </tbody> </table><\/script><div ng-show="isLoading"><div>{{ \'SAVE_ON_PROGRESS\' | translate }}</div></div></div>'), e.put("app/pages/profile/profile.html", '<div ng-controller="ProfilePageCtrl"><div ba-panel=""><div class="panel-content"><form name="personalInfoForm.user"><h3 class="with-line">{{ \'PROFILE_USERHEADER\' | translate }}</h3><div class="row"><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.name.$invalid && personalInfoForm.user.$submitted}"><div class="form-group row clearfix"><label for="inputFirstName" class="col-sm-3 control-label">{{ \'PROFILE_NAME\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'name\']" name="name" class="form-control" id="inputFirstName" required=""> <span class="help-block error-block basic-block">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span></div></div></div><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.surname.$invalid && personalInfoForm.user.$submitted}"><div class="form-group row clearfix"><label for="inputLastName" class="col-sm-3 control-label">{{ \'PROFILE_SURNAME\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'surname\']" name="surname" class="form-control" id="inputLastName" required=""> <span class="help-block error-block basic-block">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span></div></div></div><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.tcNo.$invalid && personalInfoForm.user.$submitted}"><div class="form-group row clearfix"><label for="inputTCNo" class="col-sm-3 control-label">{{ \'PROFILE_TC\' | translate }}</label><div class="col-sm-9"><input type="text" name="tcNo" ng-model="userInformation[\'tcNumber\']" class="form-control" id="inputTCNo" ng-pattern="/^[0-9]{11}$/" ng-change="setFocused()" required=""> <span class="help-block error-block basic-block" ng-show="personalInfoForm.user.tcNo.$error.required">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span> <span class="help-block error-block basic-block" ng-show="personalInfoForm.user.tcNo.$error.pattern && personalInfoForm.user.$submitted">{{ \'VALIDFIELD_ERROR\' | translate }}</span></div></div></div></div><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.username.$invalid && (personalInfoForm.user.username.$dirty || personalInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputUserName" class="col-sm-3 control-label">{{ \'PROFILE_USERNAME\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'userName\']" name="username" class="form-control" id="inputUserName" required=""> <span class="help-block error-block basic-block" ng-show="personalInfoForm.user.username.$error.required && (personalInfoForm.user.username.$dirty || personalInfoForm.user.$submitted)">Bu alanın doldurulması zorunludur.</span> <span ng-if="userexist" class="help-block error-block basic-block">{{ \'USEREXISTS_ERROR\' | translate }}</span></div></div></div><div class="form-group row clearfix"><label class="col-sm-3 control-label">{{ \'PROFILE_COMPANY\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'companyName\']" class="form-control" id="inputCompanyName" placeholder=""></div></div><div class="form-group row clearfix"><label for="inputOccupation" class="col-sm-3 control-label">{{ \'PROFILE_OCCUPATION\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'occupation\']" class="form-control" id="inputOccupation"></div></div></div></div><h3 class="with-line">{{ \'PROFILE_CONTACTHEADER\' | translate }}</h3><div class="row"><div class="col-md-6"><div class="form-group row clearfix has-feedback" ng-class="{\'has-error\': personalInfoForm.user.email.$invalid && personalInfoForm.user.$submitted}"><label for="inputEmail" class="col-sm-3 control-label">{{ \'PROFILE_EMAIL\' | translate }}</label><div class="col-sm-9"><input type="email" name="email" ng-model="userInformation[\'email\']" class="form-control" id="inputEmail" required=""> <span class="error help-block error-block basic-block" ng-show="personalInfoForm.user.email.$error.required && (personalInfoForm.user.email.$dirty || personalInfoForm.user.$submitted)">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span> <span class="error help-block error-block basic-block" ng-show="personalInfoForm.user.email.$error.email && personalInfoForm.user.$submitted">{{ \'VALIDEMAIL_ERROR\' | translate }}</span> <span ng-if="emailexist" class="help-block error-block basic-block">{{ \'EMAILEXISTS_ERROR\' | translate }}</span></div></div><div class="form-group row clearfix"><label for="inputAddress" class="col-sm-3 control-label">{{ \'PROFILE_ADDRESS\' | translate }}</label><div class="col-sm-9"><textarea class="form-control" ng-model="userInformation[\'address\']" id="inputAddress" name="address"></textarea></div></div></div><div class="col-md-6"><div class="form-group row clearfix has-feedback" ng-class="{\'has-error\': personalInfoForm.user.telNo.$invalid && personalInfoForm.user.$submitted}"><label class="col-sm-3 control-label">{{ \'PROFILE_PHONE\' | translate }}</label> <input style="width:350px" name="telNo" type="tel" ng-model="userInformation[\'phoneNumber\']" class="form-control" id="inputPhone" mask="(999) 999-9999"> <span style="padding-left:130px" class="error help-block error-block basic-block" ng-show="personalInfoForm.user.email.$invalid">{{ \'VALIDPHONEFIELD_ERROR\' | translate }}</span></div></div></div><button type="submit" ng-click="personalInfoForm.user.$valid && updateUserInformation()" class="btn btn-primary btn-with-icon"><i class="ion-android-checkmark-circle"></i>{{ \'UPDATE_BUTTON\' | translate }}</button></form></div></div></div>'), e.put("app/pages/task/equipmentModal.html", '<div class="modal-content modal-position"><div class="modal-header" style="background-color:#209e91">{{\'TASK_EQUIPMENT_MODAL_NAMES\' | translate}} <button type="button" class="close" ng-click="$dismiss();" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><div ng-if="allEquipment.length == 0"><p style="color:red" translate="{{\'TASK_EQUIPMENT_ERROR_MESSAGE\'}}"></p></div><ul class="list"><li class="item" ng-repeat="equipment in allEquipment">{{equipment.name}}</li></ul></div></div>'), e.put("app/pages/task/task.html", '<div id="preloader" ng-show="isLoading"><div></div></div><div class="panel"><div class="panel-body"><div class="form-group select-page-size-wrap"><label>{{\'TABLE_ROWSONPAGE\' | translate}}<select class="form-control show-tick" ng-model="itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered" st-table="displayedAllLogs" st-safe-src="allTasks"><thead><tr><th ng-repeat="column in columns track by $index">{{column}}</th></tr></thead><tbody><tr ng-repeat="task in displayedAllLogs" class="task-page-style"><td><a ng-class="{\'inActiveLink\': task.stateOfControl == taskStatus.COMPLETED }" ng-click="loadAssignmentsToView(task)">{{task.name}}</a></td><td>{{task.description}}</td><td>{{task.assignmentDate || \' -\' | date:\'dd-MM-yyyy\' }}</td><td>{{task.expireDate || \' -\' | date:\'dd-MM-yyyy\' }}</td><td>{{task.barcode}}</td><td><a ng-click="showEquipment(task.equipmentType)">All Equipment</a></td><td ng-if="task.stateOfControl != taskStatus.COMPLETED">{{task.rejectReason}}</td><td ng-if="task.stateOfControl == taskStatus.COMPLETED"></td><td ng-if="task.decisionStatus != 1 && (task.stateOfControl == taskStatus.COMPLETED || task.stateOfControl == taskStatus.ONTIME)" class="task-completed">{{ \'STATUS0_LISTINGTASKPAGE\' | translate}} <span class="ion ion-ios-checkmark-empty task-success-icon"></span></td><td class="task-incompleted" ng-if="task.decisionStatus != 1 && task.stateOfControl == taskStatus.INCOMPLETED">{{ \'STATUS1_LISTINGTASKPAGE\' | translate}}</td><td class="task-rejected" ng-if="task.stateOfControl == taskStatus.CRITICAL">{{\'STATUS4_LISTINGTASKPAGE\'| translate }}</td><td ng-if="task.stateOfControl == taskStatus.LATE" class="task-late">{{\'STATUS2_LISTINGTASKPAGE\'| translate }}</td><td class="task-rejected" ng-if="task.decisionStatus == 1">Rejected</td><td ng-if="task.stateOfControl == taskStatus.COMPLETED"><a id="click-link" ng-click="getReport(task.application.id,task.controlMetadataId)">{{ "REPORTRESULT_REPORT" | translate }}</a></td><td ng-if="task.stateOfControl != taskStatus.COMPLETED">{{ "REPORT_DOCUMENTMODAL_STATUS_PREPARING" | translate }}</td></tr></tbody><tfoot><tr><td colspan="7" class="text-center"><div st-pagination="" st-items-by-page="itemPerPage" st-displayed-pages="5"></div></td></tr></tfoot></table></div></div>'), e.put("app/pages/dashboard/blurFeed/blurFeed.html", '<div class="feed-messages-container" track-width="smallContainerWidth" min-width="360"><div class="feed-message" ng-repeat="message in feed" ng-click="expandMessage(message)"><div class="message-icon" ng-if="message.type == \'text-message\'"><img class="photo-icon" ng-src="{{::( message.author | profilePicture )}}"></div><div class="message-icon" ng-if="message.type != \'text-message\'"><img class="photo-icon" ng-src="{{::( message.author | profilePicture )}}"> <span class="sub-photo-icon" ng-class="::message.type"></span></div><div class="text-block text-message"><div class="message-header"><span class="author">{{ ::message.author }} {{ ::message.surname}}</span></div><div class="message-content line-clamp" ng-class="{\'line-clamp-2\' : !message.expanded}"><span ng-if="message.preview">{{message.header}}</span>{{::message.text}}</div><div class="preview" ng-show="message.expanded" ng-if="message.preview"><a href="{{::message.link}}" target="_blank"><img ng-src="{{ ::( message.preview | appImage )}}"></a></div><div ng-show="message.expanded" class="message-time"><div class="post-time">{{::message.time}}</div><div class="ago-time">{{::message.ago}}</div></div></div></div></div>'), e.put("app/pages/dashboard/dashboardMap/dashboardMap.html", '<div id="amChartMap"></div>'), e.put("app/pages/dashboard/dashboardCalendar/dashboardCalendar.html", '<div id="calendar" class="blurCalendar"></div>'), e.put("app/pages/dashboard/dashboardLineChart/dashboardLineChart.html", '<div id="amchart"></div>'), e.put("app/pages/dashboard/dashboardPieChart/dashboardPieChart.html", '<div class="pie-charts"><div class="pie-chart-item-container" ng-repeat="chart in charts"><div ba-panel=""><div class="pie-chart-item dashboard-panel-icon"><div class="row"><div class="col-xs-3"><i class="chart-icon i-{{ ::chart.icon }}"></i></div><div class="description col-xs-9"><div class="col-xs-8">{{ chart.description | translate}}</div><div class="col-xs-4 description-stats text-right"><small>{{ ::chart.stats }}</small></div></div></div></div></div></div></div>'), e.put("app/pages/dashboard/dashboardTodo/dashboardTodo.html", '<div class="task-todo-container" ng-class="{\'transparent\': transparent}"><input type="text" value="" class="form-control task-todo" placeholder="Task to do.." ng-keyup="addToDoItem($event)" ng-model="newTodoText"> <i ng-click="addToDoItem(\'\',true)" class="add-item-icon ion-plus-round"></i><div class="box-shadow-border"></div><ul class="todo-list" ui-sortable="" ng-model="todoList"><li ng-repeat="item in todoList" ng-if="!item.deleted" ng-init="activeItem=false" ng-class="{checked: isChecked, active: activeItem}" ng-mouseenter="activeItem=true" ng-mouseleave="activeItem=false"><div class="blur-container"><div class="blur-box"></div></div><i class="mark" style="background-color: {{::item.color}}"></i> <label class="todo-checkbox custom-checkbox custom-input-success"><input type="checkbox" ng-model="isChecked"> <span class="cut-with-dots">{{ item.text }}</span></label> <i class="remove-todo ion-ios-close-empty" ng-click="item.deleted = true"></i></li></ul></div>'), e.put("app/pages/dashboard/popularApp/popularApp.html", '<div class="popular-app-img-container"><div class="popular-app-img"><img ng-src="{{::( \'app/my-app-logo.png\' | appImage )}}"> <span class="logo-text">Super&nbspApp</span></div></div><div class="popular-app-cost row"><div class="col-xs-9">Most Popular App</div><div class="col-xs-3 text-right">175$</div></div><div class="popular-app-info row"><div class="col-xs-4 text-left"><div class="info-label">Total Visits</div><div>47,512</div></div><div class="col-xs-4 text-center"><div class="info-label">New Visits</div><div>9,217</div></div><div class="col-xs-4 text-right"><div class="info-label">Sales</div><div>2,928</div></div></div>'), e.put("app/pages/dashboard/trafficChart/trafficChart.html", '<div class="channels-block" ng-class="{\'transparent\': transparent}"><div class="chart-bg"></div><div class="traffic-chart" id="trafficChart"><div class="canvas-holder"><canvas id="chart-area" width="280" height="280"></canvas><div class="traffic-text"></div></div></div><div class="channels-info"><div><div class="channels-info-item" ng-repeat="label in doughnutData.labels" ng-init="i = $index; data = doughnutData.datasets[0]"><div class="legend-color" style="background-color: {{::data.backgroundColor[i]}}"></div><p>{{::label}}<span class="channel-number">+{{data.percentage[i]}}%</span></p><div class="progress progress-sm channel-progress"><div class="progress-bar" role="progressbar" aria-valuenow="{{data.percentage[i]}}" aria-valuemin="0" aria-valuemax="100" style="width: {{item.percentage}}%"></div></div></div></div></div></div>'), e.put("app/pages/dashboard/weather/weather.html", '<div class="weather-wrapper"><div class="weather-main-info"><h5 class="city-date font-x1dot5"><div>{{geoData.geoplugin_city}} - {{geoData.geoplugin_countryName | uppercase}}</div><div>{{ weather.days[weather.current].date | date : \'EEEE h:mm\'}}</div></h5><div class="weather-description font-x1dot5"><i class="font-x3 {{weatherIcons[weather.days[weather.current].icon]}}"></i><div class="weather-info">{{weather.days[weather.current].main}} - {{weather.days[weather.current].description}}</div></div><div class="weather-temp font-x1dot5"><i class="font-x2 ion-thermometer"></i><div class="weather-info" ng-switch="" on="units"><span ng-switch-when="metric">{{weather.days[weather.current].temp}} °C | <a ng-click="switchUnits(\'imperial\')" href="">°F</a></span> <span ng-switch-when="imperial">{{weather.days[weather.current].temp}} °F | <a ng-click="switchUnits(\'metric\')" href="">°C</a></span></div></div></div><div id="tempChart" class="temp-by-time"></div><div class="select-day"><div class="day" ng-repeat="day in weather.days" ng-click="switchDay($index)"><div><span class="font-x1dot25">{{day.temp}}</span></div><div><i class="weatherIcon font-x2 {{weatherIcons[day.icon]}}"></i> <span class="select-day-info">{{day.main}}</span></div><div><span>{{day.date | date : \'EEE\'}}</span></div></div></div></div>'), e.put("app/pages/form-management/assign-application/assign-application.html", '<div ng-controller="assignApplicationCtrl as controlManagementVm"><div class="panel"><div class="panel-body"><div style="text-align: right" class="form-group"><button class="btn btn-primary" ng-disabled="makeSelectable" ng-click="saveNewUserApplication()">{{ "ASSIGNUSERTOAPPLICATION_SAVEBUTTON" | translate }}</button></div><div class="form-group"><label for="sel1">{{ "ASSIGNUSERTOAPPLICATION_FORMS" | translate }}</label><ui-select ng-model="selectedApp" on-select="getAssignedUsersForSelectedApp(selectedApp.id)"><ui-select-match placeholder="{{ \'ASSIGNUSERTOAPPLICATION_FORMS\' | translate }}">{{ selectedApp.name }}</ui-select-match><ui-select-choices repeat="app in allApplications | filter: {name: $select.search}"><div ng-bind-html="app.name | highlight: $select.search"></div></ui-select-choices></ui-select></div><div class="row"><div class="col"><div class="list-group" id="list1"><span class="list-group-item active">{{ "ASSIGNUSERTOAPPLICATION_USERS" | translate }} <input ng-disabled="makeSelectable" title="{{ \'ASSIGNUSERTOAPPLICATION_TOGGLEALL\' | translate }}" ng-click="toggleA()" ng-model="togglea" value="{{ togglea }}" type="checkbox" class="pull-right"></span> <span ng-repeat="user in listA"><span class="list-group-item">{{ user.userName }} <input ng-disabled="makeSelectable" ng-click="selectA(user.id)" name="selectedA[]" value="{{ user.id }}" ng-checked="selectedA.indexOf(user.id) > -1" type="checkbox" class="pull-right"></span></span></div></div><div class="col-md-2 v-center text-center"><div class="btn-group"><button title="{{ \'ASSIGNUSERTOAPPLICATION_REMOVEBUTTON\' | translate }}" ng-disabled="makeSelectable" class="btn btn-default" ng-click="bToA()"><i class="glyphicon glyphicon-chevron-left"></i></button> <button title="{{ \'ASSIGNUSERTOAPPLICATION_ADDBUTTON\' | translate }}" ng-disabled="makeSelectable" class="btn btn-default" ng-click="aToB()"><i class="glyphicon glyphicon-chevron-right"></i></button></div></div><div class="col"><div class="list-group" id="list2"><span class="list-group-item active">{{ "ASSIGNUSERTOAPPLICATION_ASSIGNEDUSERS" | translate }} <input ng-disabled="makeSelectable" title="{{ \'ASSIGNUSERTOAPPLICATION_TOGGLEALL\' | translate }}" ng-click="toggleB()" ng-model="toggleb" value="{{ toggleb }}" type="checkbox" class="pull-right"></span> <span ng-repeat="user in listB"><span class="list-group-item">{{ user.userName }} <input ng-disabled="makeSelectable" ng-click="selectB(user.id)" name="selectedB[]" value="{{ user.id }}" ng-checked="selectedB.indexOf(user.id) > -1" type="checkbox" class="pull-right"></span></span></div></div></div></div></div></div>'), e.put("app/pages/forms/detailCameraModal/detailCameraModal.html", '<div class="modal-content"><div class="modal-header" style="background-color:#209e91"><button type="button" class="close" ng-click="onCloseModal()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="addPageForm"><div class="modal-body"><div class="form-group upload-btn-align"><div class="upload-btn-wrapper"><button type="button" class="btn btn-info">{{\'DETAIL_CAMERAMODAL_UPLOAD_BUTTON\' | translate }}</button> <input type="file" fileread="cameraComponent" name="pic" accept="image/*"></div></div><img style="width: 100%;" ng-show="isImageUploaded" ng-src="{{cameraImageURL + fileName}}"><br><br><br><br><div class="form-group"><label>{{ \'DETAIL_CAMERAMODAL_DESCRIPTION\' | translate }}</label> <textarea ng-model="imageDescription" class="form-control"></textarea></div></div><div class="modal-footer"><button type="submit" ng-disabled="imageDescription == \'\' || !isImageUploaded" class="btn btn-primary" ng-click="onSaveDetailCameraInformation()">{{ \'SAVE_BUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/forms/informationModal/information-modal.html", '<div class="modal-content modal-position"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss();" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body image-modal"><div ng-bind-html="informationModalContent"></div></div></div>'), e.put("app/pages/more/datasource/datasource.html", '<div ng-if="!isLoading"><div class="panel"><div class="panel-body"><div class="form-group"><div class="alert bg-success" ng-if="isSuccess"><strong>{{successMessage}}</strong></div><div class="alert bg-danger" ng-if="isError"><strong>{{errorMessage}}</strong></div><div class="row"><div class="col-sm-3"><label for="sel1">{{ \'DATASOURCE_NAME\' | translate }}:</label><div class="form-group"><input type="text" ng-model="datasource.name" class="form-control"></div></div></div><div class="row"><div class="col-sm-3"><label for="sel1">{{ \'DATASOURCE_TYPE\' | translate }}:</label><div class="form-group"><select class="form-control" ng-model="datasource.type" ng-change="setButton()" string-to-number=""><option value="">{{ \'DATASOURCE_TYPE_SELECT_TEXT\' | translate }}</option><option value="0">REST</option><option value="1">SOAP</option></select></div></div><div class="col-sm-3"><label for="sel1">{{ \'DATASOURCE_ENDPOINT\' | translate }}:</label><div class="form-group"><input type="text" ng-change="setButton()" ng-model="datasource.endpoint" class="form-control"></div></div></div><div class="row"><div class="col-sm-3"><div class="form-group"><button type="button" class="btn btn-primary validate-button editable-table-button" ng-click="validate()">{{ \'DATASOURCE_VALIDATE_BUTTON\' | translate }}</button> <button type="button" class="btn btn-primary validate-button editable-table-button" ng-click="addList()" ng-if="validDataSource">{{ \'DATASOURCE_ADDLIST_BUTTON\' | translate }}</button></div></div></div></div><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{\'TABLE_ROWSONPAGE\' | translate}}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="pagination.itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered"><thead><tr><th class="table-id"><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th>{{ \'DATASOURCE_NAME\' | translate }}</th><th>{{ \'DATASOURCE_TYPE\' | translate }}</th><th>{{ \'DATASOURCE_ENDPOINT\' | translate }}</th></tr><tr><th></th><th id="table-search-input"><input ng-model="searchVariables.name" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'DATASOURCE_SEARCH_NAME\' | translate }}"></th><th></th><th></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ \'TABLE_SEARCHBUTTON\' | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ \'TABLE_REMOVEFILTERBUTTON\' | translate }}</button></th></tr></thead><tbody><tr ng-repeat="ds in displayedAllDataSources" class="no-top-border"><td></td><td>{{ds.name || \' -\' }}</td><td ng-if="ds.type == 0">REST</td><td ng-if="ds.type == 1">SOAP</td><td>{{ds.endpoint || \' -\' }}</td><td><button class="btn btn-danger editable-table-button btn-xs" ng-click="removeDataSource(ds,$index)">{{ \'TABLE_DELETEBUTTON\' | translate }}</button></td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getLogList()" items-per-page="pagination.itemPerPage" total-items="bigTotalItems" ng-model="pagination.bigCurrentPage" class="pagination-sm" num-pages="numPages" direction-links="false" boundary-links="true" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div>'), e.put("app/pages/more/devices/device.html", '<div ng-if="!isLoading"><div class="panel"><div class="panel-body table-responsive"><div class="form-group"><div class="alert bg-danger" ng-if="isError"><strong>{{ errorMessage }}</strong></div><div class="row"><div class="col-sm-3"><label for="sel1">{{ "DEVICE_ID" | translate }}:</label><div class="form-group"><input type="text" ng-model="device.deviceUUID" class="form-control"></div></div></div><div class="row"><div class="col-sm-3"><div class="form-group"><button type="button" class="btn btn-primary validate-button editable-table-button" ng-click="addDevice()" ng-disabled="isDeviceAdded">{{ "ADD_BUTTON" | translate }}</button></div></div></div></div><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{ "TABLE_ROWSONPAGE" | translate }}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="pagination.itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered"><thead><tr><th class="table-id"><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th>{{ "DEVICE_ID" | translate }}</th><th>{{ "DEVICE_CREATEDBY" | translate }}</th></tr><tr><th></th><th id="table-search-input"><input ng-model="searchVariables.uuid" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="UUID Ara"></th><th></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ "TABLE_SEARCHBUTTON" | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ "TABLE_REMOVEFILTERBUTTON" | translate }}</button></th></tr></thead><tbody><tr ng-repeat="ds in allDisplayedDevices" class="no-top-border"><td></td><td>{{ ds.deviceUUID || " -" }}</td><td>{{ ds.createdBy || " -" }}</td><td><button class="btn btn-danger editable-table-button btn-xs" ng-click="deleteDevice(ds.id,$index)">{{ "TABLE_DELETEBUTTON" | translate }}</button></td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getAllCompanyDevices()" items-per-page="pagination.itemPerPage" total-items="bigTotalItems" ng-model="pagination.bigCurrentPage" class="pagination-sm" num-pages="numPages" direction-links="false" boundary-links="true" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div>'), e.put("app/pages/more/list-logs/list-logs.html", '<div ng-if="!isLoading"><div class="panel"><div class="panel-body table-responsive"><div class="form-group"><label for="search">{{ \'LISTLOG_SEARCHMESSAGE\' | translate }}:</label><div class="col-90"><input type="search" name="search" ng-model="logVariables.message" class="form-control"></div></div><label for="sel1">{{ \'LISTLOG_FILTER\' | translate }}:</label><div class="row"><div class="col-sm-3"><div class="form-group"><select class="form-control" ng-model="logVariables.application"><option value="">{{ \'LISTLOG_FILTERAPPLICATION\' | translate }}</option><option ng-repeat="application in allApplications" value="{{application.name}}">{{application.name}}</option></select></div></div><div class="col-sm-3"><div class="form-group"><select class="form-control" ng-model="logVariables.environment"><option value="">{{ \'LISTLOG_FILTERENVIRONMENT\' | translate }}</option><option ng-repeat="environment in allEnvironments" value="{{environment.name}}">{{environment.name}}</option></select></div></div><div class="col-sm-3"><div class="form-group"><select class="form-control" ng-model="logVariables.level"><option value="">{{ \'LISTLOG_FILTERLEVEL\' | translate }}</option><option ng-repeat="level in allLevels" value="{{level.name}}">{{level.name}}</option></select></div></div></div><div class="row"><div class="col-sm-3"><label for="sel1">{{ \'LISTLOG_SEARCHSTARTDATE\' | translate }}:</label><p class="input-group"><input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="logVariables.startDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC\'}" is-open="popup1.opened" datepicker-options="startDateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><div class="col-sm-3"><label for="sel1">{{ \'LISTLOG_SEARCHENDDATE\' | translate }}:</label><p class="input-group"><input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="logVariables.endDate" ng-change="checkEndDateModal()" ng-model-options="{timezone: \'UTC\'}" is-open="popup2.opened" datepicker-options="endDateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div></div><div class="row"><div class="col-sm-3"><label for="sel1">{{ \'LISTLOG_DEVICEID\' | translate }}:</label><div class="form-group"><input type="text" ng-model="logVariables.deviceID" class="form-control"></div></div><div class="col-sm-3 mt18"><div class="form-group"><button type="button" class="btn btn-primary search-button editable-table-button" ng-click="search()">{{ \'TABLE_SEARCHBUTTON\' | translate }}</button> <button type="button" class="btn btn-danger search-button" ng-click="deleteFilter()" style="margin:2px 0 2px 0">{{ \'TABLE_REMOVEFILTERBUTTON\' | translate }}</button></div></div></div><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{\'TABLE_ROWSONPAGE\' | translate}}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="pagination.itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered"><thead><tr><th class="table-id"><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_TIMESTAMP\' | translate}}">{{ \'LISTLOG_TABLETIMESTAMP\' | translate }}</span></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_APPVERSION\' | translate}}">{{ \'LISTLOG_TABLEAPPLICATIONVERSION\' | translate }}</span></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_APPLICATION\' | translate}}">{{ \'LISTLOG_TABLEAPPLICATION\' | translate }}</span></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_ENVIRONMENT\' | translate}}">{{ \'LISTLOG_TABLEENVIRONMENT\' | translate }}</span></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_DEVICEID\' | translate}}">{{ \'LISTLOG_DEVICEID\' | translate }}</span></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_LEVEL\' | translate}}">{{ \'LISTLOG_TABLELEVEL\' | translate }}</span></th><th><span tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_DEVICELOG_MESSAGE\' | translate}}">{{ \'LISTLOG_TABLEMESSAGE\' | translate }}</span></th></tr></thead><tbody><tr ng-repeat="log in displayedAllLogs" class="no-top-border"><td></td><td class="td-list-log">{{log.timestamp || \' -\' }}</td><td class="td-list-log">{{log.gadgetVersion || \' -\' }}</td><td class="td-list-log">{{log.gadgetName || \' -\' }}</td><td class="td-list-log">{{log.environment || \' -\' }}</td><td class="td-list-log">{{log.deviceId || \' -\' }}</td><td class="td-list-log">{{log.level || \' -\' }}</td><td class="td-list-log">{{log.message || \' -\' }}</td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getLogList()" items-per-page="pagination.itemPerPage" total-items="bigTotalItems" ng-model="pagination.bigCurrentPage" class="pagination-sm" num-pages="numPages" direction-links="false" boundary-links="true" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div>'), e.put("app/pages/more/list-logs/stDateRange.html", '<div class="input-group"><input type="text" class="form-control" datepicker-popup="yyyy/MM/dd" ng-model="before" is-open="isBeforeOpen" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openBefore($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div class="input-group"><input type="text" class="form-control" datepicker-popup="yyyy/MM/dd" ng-model="after" is-open="isAfterOpen" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openAfter($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>'), e.put("app/pages/palette/add-content-to-info-component/add-content-to-info-component.html", '<div ng-controller="AddContentToInfoComponentCTRL"><div class="btn-group" role="group" aria-label="Basic example"><button type="button" ng-click="goBack()" class="btn btn-default"><i class="ion-arrow-left-c tab-top-icon"></i> {{ \'BACK_BUTTON\' | translate }}</button> <button type="button" ng-click="openGalleryModal()" class="btn btn-default"><i class="ion-images tab-top-icon"></i> {{ \'PALETTE_GALLERY\' | translate }}</button></div><br><br><summernote ng-model="componentOption.component.options[0].key" on-image-upload="imageUpload(files)" editable="editable" editor="editor" config="options"></summernote><script type="text/javascript"> \r\n  $(document).ready(function () { \r\n    $(\'.dropdown-toggle\').dropdown(); }); \r\n  <\/script><div id="preloader" ng-show="isLoading"><div></div></div></div>'), e.put("app/pages/palette/confirmModal/confirmBeforeClosingTheEditor.html", '<div class="modal-content"><div class="modal-header"><h4 class="modal-title">{{ \'CONFIRMBEFORECLOSINGTHEADITOR_CLOSE\' | translate }}</h4></div><form name="confirmForm"><div class="modal-body">{{ \'CONFIRMBEFORECLOSINGTHEADITOR_MESSAGE\' | translate }}</div><div class="modal-footer"><button type="submit" set-focus-default="" class="btn btn-primary" ng-click="closeAndSave()">{{ \'CONFIRMBEFORECLOSINGTHEADITOR_CLOSEANDSAVE\' | translate }}</button> <button type="button" class="btn btn-danger" ng-click="closeWithoutSave()">{{ \'CONFIRMBEFORECLOSINGTHEADITOR_CLOSEWITHOUTSAVE\' | translate }}</button></div></form></div>'), e.put("app/pages/palette/add-text-content/add-text-content.html", '<div ng-controller="AddTextContentCtrl"><div class="btn-group" role="group" aria-label="Text Content"><button type="button" ng-click="goBackToPalette()" class="btn btn-default"><i class="ion-arrow-left-c tab-top-icon"></i> Back</button></div><br><br><div><textarea ng-model="componentOption.component.options[0].key" name="content" class="form-control" style="height:300px!important;"></textarea></div></div>'), e.put("app/pages/palette/add-event/add-event.html", '<div ng-controller="AddEventCtrl"><div class="btn-group" role="group"><button type="button" ng-click="goBackToPalette()" class="btn btn-default"><i class="ion-arrow-left-c tab-top-icon"></i> {{ \'BACK_BUTTON\' | translate}}</button></div><br><br><ul class="nav nav-tabs" id="myTab"><li class="active"><a data-target="#function" data-toggle="tab">{{ \'ADDEVENT_TABEVENT\' | translate }}</a></li><li><a data-target="#addfunction" data-toggle="tab">{{ \'ADDEVENT_TABFUNCTION\' | translate }}</a></li></ul><div class="tab-content"><div class="tab-pane active" id="function"><form name="eventForm"><div class="row"><div ng-if="!isEventForNavigation" class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow-y:scroll;max-height:180px"><label for="sel1">{{ \'ADDEVENT_EVENTLIST\' | translate }}</label><div class="list-group" style="width:50%;overflow-y:scroll;max-height:250px"><a class="list-group-item"><input type="text" ng-model="eventName" name="search" class="form-control" placeholder="{{ \'ADDEVENT_SEARCHINPUT\' | translate }}"></a> <a ng-click="showSelectedEvent(event,$index)" class="list-group-item" ng-repeat="event in componentEvents.events | filter:{\'type\': eventName }">{{event.type}} <span style="color:red;float:right;" ng-click="deleteEvent($index)" class="glyphicon glyphicon-minus-sign"></span></a></div></div></div><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="form-group"><label for="sel1">{{ \'ADDEVENTMODAL_TYPE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDEVENT_EVENTNAME\' | translate}}"></a></label><ui-select ng-model="eventOptions.id" class="btn-group bootstrap-select form-control" ng-disabled="false" append-to-body="true" search-enabled="true"><ui-select-match placeholder="{{ \'ADDEVENT_SEARCHINPUT\' | translate }}">{{$select.selected.type}}</ui-select-match><ui-select-choices repeat="eventType.id as eventType in allEventTypes | filter: $select.search | filter: filterEvent"><span ng-bind-html="eventType.type"></span></ui-select-choices></ui-select></div><div class="form-group"><label for="sel1">{{ \'ADDEVENTMODAL_FUNCTIONTYPE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="left" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDEVENT_FUNCTIONTYPE\' | translate}}"></a></label><ui-select ng-model="functionType.id" ng-change="setFunctions();" class="btn-group bootstrap-select form-control" ng-disabled="false" append-to-body="true" search-enabled="true"><ui-select-match placeholder="{{ \'ADDEVENTMODAL_SEARCHFUNCTION\' | translate }}">{{$select.selected.name | translate}}</ui-select-match><ui-select-choices repeat="functionType.id as functionType in eventFunctionTypes | filter: $select.search"><span translate="{{functionType.name}}"></span></ui-select-choices></ui-select></div><div class="form-group" ng-show="!showNavigationPages"><label for="sel1">{{ \'ADDEVENTMODAL_FUNCTIONS\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDEVENT_FUNCTIONS\' | translate}}"></a></label><div ng-if="isEventForNavigation"><ui-select ng-model="eventOptions.functions" class="btn-group bootstrap-select form-control" ng-disabled="false" append-to-body="true" search-enabled="true" ng-change="setSaveButtonDisabled()"><ui-select-match>{{$select.selected.description}}</ui-select-match><ui-select-choices repeat="function as function in selectedFunctions"><span ng-bind-html="function.description"></span></ui-select-choices></ui-select></div><div ng-if="!isEventForNavigation"><multiselect ng-model="eventOptions.functions" ng-change="setSaveButtonDisabled()" id="multiSelectButton" options="selectedFunctions" id-prop="id" display-prop="description"></multiselect></div></div><div class="form-group" ng-show="showNavigationPages"><label for="sel1">{{ \'ADDFUNCTION_NAVIGATEDPAGE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDFUNCTION_PAGES\' | translate}}"></a></label><ui-select ng-model="page.shortName" class="btn-group bootstrap-select form-control" ng-disabled="false" append-to-body="true" search-enabled="true" ng-change="setSaveButtonDisabled()"><ui-select-match placeholder="{{ \'ADDFUNCTION_SEARCHPAGE\' | translate }}">{{$select.selected.title}}</ui-select-match><ui-select-choices repeat="page.shortName as page in allPages | filter: $select.search"><span ng-bind-html="page.title"></span></ui-select-choices></ui-select></div><div ng-show="!isSavedEventShowed"><button type="button" class="btn btn-primary btn-block" ng-click="saveEvent()" ng-disabled="checkValidityOfEvent()">{{ \'ADDEVENT_ADDBUTTON\' | translate }}</button></div><div style="float:right" ng-show="isSavedEventShowed"><button type="button" class="btn btn-primary" ng-click="saveEvent()" ng-disabled="!isChanged">{{ \'ADDEVENT_SAVEBUTTON\' | translate }}</button> <button type="button" class="btn btn-primary" ng-if="!isEventForNavigation" ng-click="clear()">{{ \'ADDEVENT_CLEARBUTTON\' | translate }}</button> <button type="button" class="btn btn-primary" ng-if="isEventForNavigation" ng-click="deleteNavigationTabFunction()">{{ \'ADDEVENT_DELETENAVIGATIONTABBUTTON\' | translate }}</button></div></div></div></div></form></div><div class="tab-pane" id="addfunction" ng-controller="AddFunctionCTRL"><form name="functionForm"><div class="row"><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><label for="sel1">{{ \'ADDFUNCTION_LIST\' | translate }}</label><div class="list-group" style="width:50%;overflow-y:scroll;max-height:250px"><a class="list-group-item"><input ng-model="searchName" class="form-control" placeholder="{{ \'ADDFUNCTION_SEARCHFUNCTION\' | translate }}"></a><div class="list-group-item" ng-repeat="function in allFunctions | filter:filterFunction | filter:{\'description\': searchName}"><span ng-click="setSelectedFunction(function)">{{function.description}}</span> <span style="color:red;float:right;" ng-click="deleteFunction(function.id)" class="glyphicon glyphicon-minus-sign"></span></div></div></div></div><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="form-group"><label for="sel1">{{ \'ADDFUNCTION_NAME\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDFUNCTION_FUNCTIONNAME\' | translate}}"></a></label> <input type="text" ng-model="functionInformation.description" name="description" class="form-control" required=""></div></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="form-group"><label for="sel1">{{ \'ADDFUNCTION_FUNCTIONDETAIL\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDFUNCTION_FUNCTIONDETAIL\' | translate}}"></a></label> <textarea ng-disabled="setDisabled()" ng-model="functionInformation.functionDetail" name="functionDetail" class="form-control" required=""></textarea></div><div ng-show="!isSavedFunctionShowed"><button type="button" class="btn btn-primary btn-block" ng-click="saveFunction()" ng-disabled="checkValidityOfFunction()">{{ \'ADDEVENT_ADDBUTTON\' | translate }}</button></div><div style="float:right" ng-show="isSavedFunctionShowed"><button type="button" class="btn btn-primary" ng-click="saveFunction()" ng-disabled="checkValidityOfFunction()">{{ \'ADDEVENT_SAVEBUTTON\' | translate }}</button> <button type="button" class="btn btn-primary" ng-click="clearFunctionInformation()">{{ \'ADDEVENT_CLEARBUTTON\' | translate }}</button></div></div></div></div></form></div></div></div>'), e.put("app/pages/palette/galleryModal/galleryModal.html", '<div class="modal-content modal-position"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss();" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="galleryForm"><div class="modal-body gallery-modal"><div ng-if="images.length == 0"><span class="ion-alert empty_gallery_warning_span"></span> <strong class="empty_gallery_warning_text">{{\'EMPTY_GALLERY_MESSAGE\' | translate}}</strong></div><div ng-repeat="image in images" ng-if="$index % 3 == 0" class="row"><div ng-if="images[$index]" class="col-xs-4"><input type="checkbox" ng-model="selectedImages[$index]"><div class="gallery"><img ng-click="showFullScreenImage(imagePath+images[$index])" ng-src="{{imagePath}}{{images[$index]}}" height="50" width="50"></div></div><div ng-if="images[$index+1]" class="col-xs-4"><input type="checkbox" ng-model="selectedImages[$index+1]"><div class="gallery"><img ng-click="showFullScreenImage(imagePath+images[$index+1])" ng-src="{{imagePath}}{{images[$index+1]}}" height="50" width="50"></div></div><div ng-if="images[$index+2]" class="col-xs-4"><input type="checkbox" ng-model="selectedImages[$index+2]"><div class="gallery"><img ng-click="showFullScreenImage(imagePath+images[$index+2])" ng-src="{{imagePath}}{{images[$index+2]}}" height="50" width="50"></div></div></div></div><div class="modal-footer gallery-button"><button type="submit" set-focus-default="" class="btn btn-primary" ng-disabled="controlIsImagesChecked()" ng-click="addPicturesToEditor()">{{ \'ADD_BUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/palette/full-screen-image-modal/full-screen-image-modal.html", '<div class="modal transparent" ng-click="closeImageModal()"></div><div class="modal-content transparent"><img ng-src="{{imageSrc}}" class="fullscreen-image"></div>'), e.put("app/pages/palette/multipleSelectModal/multipleSelectModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button><h4 class="modal-title" id="myModalLabel"><div ng-repeat="option in component.options | filter:{type:\'Label\'} track by $index">{{option.key}}</div></h4></div><form name="multiSelectForm"><div class="modal-body"><div ng-repeat="option in component.options | filter:{type:\'Option\'} track by $index"><ul class="list"><li class="item item-checkbox">{{option.key}} <label style="margin-left:15px;padding-top:2px;" class="checkbox"><input type="checkbox"></label></li></ul></div></div></form></div>'), e.put("app/pages/palette/newApplicationModal/newApplicationModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="appForm"><div class="modal-body"><div class="form-group"><label for="applicationName">{{ \'NEWAPPMODAL_APPNAME\' | translate }}</label> <input type="text" set-focus-default="" class="form-control" id="applicationName" ng-model="newApp[\'name\']"></div><div class="form-group"><label for="applicationDescription">{{ \'NEWAPPMODAL_APPDESCRIPTION\' | translate }}</label> <input type="text" class="form-control" id="applicationDescription" ng-model="newApp[\'description\']"></div><div class="form-group"><label for="applicationAssignment">{{ \'NEWAPPMODAL_FORMTYPE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDNEWFORM_FORMTYPE\' | translate}}"></a></label><div class="radio"><label><input type="radio" ng-model="newApp.formType" name="optradio" value="0">{{ \'APPLICATIONPAGE_FREEFORM\' | translate }}</label> <label><input type="radio" ng-model="newApp.formType" name="optradio" value="1">{{ \'APPLICATIONPAGE_ASSIGNMENTREQUIRED\' | translate }}</label></div></div><div class="form-group"><a ng-click="showHideFormSection()">{{ \'NEWAPPMODAL_SELECTFORM\' | translate }}</a> <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDNEWFORM_SELECTEXISTINGFORM\' | translate}}"></a></div><div class="check-element animate-show-hide" ng-if="showFormSection"><label for="allApplications">{{ \'NEWAPPMODAL_FORMLIST\' | translate }}</label><select class="form-control" ng-options="application.value as application.key for application in allApplications" ng-model="selectedApp.value"></select></div></div><div class="modal-footer"><button type="submit" set-focus-default="" class="btn btn-primary" ng-click="onCreateApplication()" ng-disabled="controlFormElement() || buttonClicked">{{ \'NEWAPPMODAL_CREATEBUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/palette/newPageModal/newPageModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="closeModal()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="addPageForm"><div class="modal-body"><div class="form-group"><label for="pageTitle">{{ \'NEWPAGEMODAL_PAGETITLE\' | translate }}</label> <input type="text" name="pageTitle" class="form-control" id="pageTitle" ng-model="pageTitle" placeholder="" required=""></div></div><div class="modal-footer"><button type="submit" class="btn btn-primary" set-focus-default="" ng-click="ok()">{{ \'NEWPAGEMODAL_OKBUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/palette/validationModal/addValidationModal.html", '<div class="modal-content validation-modal"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="addValidationForm"><div class="modal-body"><div class="row"><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 validation-created-validation-col"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 validation-created-validation"><label for="sel1">{{ \'VALIDATIONMODAL_SELECTED\' | translate }}</label><ul class="list-group" ng-repeat="validation in componentValidations.validations | filter:{type:selectedValidationType}"><li class="list-group-item" ng-click="showSelectedValidation(validation,$index)">{{validation.name}} <span ng-click="deleteValidation($index)" class="ion-close validation-created-validatio-delete-icon"></span></li></ul></div></div><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="form-group"><label for="sel1">{{ \'VALIDATIONMODAL_NAME\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDVALIDATION_NAME\' | translate}}"></a></label><select ng-model="validation.id" class="form-control" ng-disabled="isSavedValidationShowed" ng-change="changeValueProperties()" ng-options="option.id as option.name for option in allValidationTypes | filter: filterValidation"></select></div><div class="form-group" ng-if="showValueProperties"><label for="applicationName">{{ \'VALIDATIONMODAL_VALUE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDVALIDATION_VALUE\' | translate}}"></a></label> <input type="text" ng-model="validation[\'value\']" name="value" class="form-control" required=""></div><div class="form-group"><span class="validation-test-link" ng-if="showRegexTestSpan" ng-click="openTestForm()">{{ \'VALIDATIONMODAL_TEST_REGEX\' | translate }}</span></div><div class="form-group"><label for="applicationDescription">{{ \'VALIDATIONMODAL_ERRORMESSAGE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_PALETTE_ADDVALIDATION_ERRORMESSAGE\' | translate}}"></a></label> <textarea ng-model="validation[\'errorMessage\']" name="errorMessage" class="form-control" maxlength="255" required=""></textarea></div></div></div><div class="validation-test-hr" ng-if="showRegexTestForm"></div><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" ng-if="showRegexTestForm"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="form-group"><label for="sel1">{{ \'VALIDATION_MODAL_EXPRESSION\' | translate}}</label><div class="validation-regular-expression-box" style="display:flex"><div class="validation-regular-expression-first-character">/^</div><div class="validation-regular-expression-input-div"><input type="text" ng-model="validationTest.regular" class="validation-regular-expression-input"></div><div class="validation-regular-expression-last-character">$/</div></div><div ng-if="isRegexChecked"><div ng-class="match ? \'validation-test validation-match\' : \'validation-not-match validation-test\'"><div class="validation-result-text">{{validationTest.result}}</div></div></div></div><div class="form-group"><label>{{\'VALIDATION_MODAL_STRING\' | translate}}</label> <input type="text" ng-model="validationTest.string" class="form-control"></div><div class="validation-test-check-div"><button type="button" ng-click="checkRegularExpression()" ng-disabled="checkTestVariableValue()" class="form-control validation-test-check-button"><span ng-class="checkTestVariableValue() ? \'ion-android-checkbox-outline validation-test-check-icon-invalid\' : \'ion-android-checkbox-outline validation-test-check-icon-valid\'"></span>&nbsp; {{\'VALIDATION_MODAL_CHECK_BUTTON\' | translate}}</button></div></div></div></div></div><div class="modal-footer"><div ng-if="!isSavedValidationShowed"><button type="button" class="btn btn-primary btn-block" ng-click="saveValidation()" ng-disabled="addValidationForm.value.$invalid || addValidationForm.errorMessage.$invalid || !validation.hasOwnProperty(\'id\')">{{ \'ADDVALIDATION_ADDBUTTON\' | translate }}</button></div><div ng-if="isSavedValidationShowed"><button type="submit" set-focus-default="" class="btn btn-primary btn-md" ng-click="saveValidation()">{{ \'ADDVALIDATION_SAVEBUTTON\' | translate }}</button> <button type="button" class="btn btn-primary btn-md" ng-click="clear()">{{ \'ADDVALIDATION_CLEARBUTTON\' | translate }}</button></div></div></form></div>'), e.put("app/pages/report/formdata-export/formDataExport.html", '<div ng-controller="formDataExportCTRL"><div ng-if="!isLoading"><div class="panel"><div class="panel-body"><div class="col-sm-12"><div class="panel panel-default" id="application-panel" ng-show="!isLoading"><div class="panel-heading">{{ \'APPLICATIONPAGE_FORMLISTNAME\' | translate }}</div><br><div class="form-group row"><div class="col-sm-12" id="search-input"><input type="text" ng-model="application.name" ng-change="search();" class="form-control application-search-input input-sm" id="search" placeholder="{{ \'APPLICATIONPAGE_APPSEARCH\' | translate }}"></div><div class="application-sortIcons"><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></div></div><div class="form-group row"><div class="col-sm-12"><button ng-click="exportAppDataExcel()">{{ \'REPORT_EXPORT_EXCEL_BUTTON\' | translate }}</button> <button ng-click="downloadLastExportExcel()">{{ \'REPORT_DOWNLOAD_EXCEL_BUTTON\' | translate }}</button></div></div><br><ul class="list-group" ng-repeat="app in applications"><li style="background-color: #ededed" class="list-group-item application-listBox clearfix" ng-mouseleave="hoveringAppName=false" ng-mouseenter="hoveringAppName=true"><div id="application-name-text"><span title="{{app.key}}">{{app.key}}</span></div><button ng-click="exportAppData(app.key,$event)">{{ \'REPORT_EXPORT_BUTTON\' | translate }}</button> <button ng-click="downloadLastExportAppData(app.key)">{{ \'REPORT_DOWNLOAD_BUTTON\' | translate }}</button></li></ul><div class="table-pagination"><ul uib-pagination="" ng-change="getAppNames()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="currentPage.number" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div></div></div></div></div>'), e.put("app/pages/report/report-result/report.html", '<div ng-if="!isLoading"><div class="panel"><div class="panel-body"><br><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{ "TABLE_ROWSONPAGE" | translate }}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="pagination.itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><div class="form-group select-page-size-wrap"><label><select class="form-control show-tick" ng-model="pagination.parameterOfReports" ng-change="changeRowsOnPage()" ng-options="parameterOfReports.value as parameterOfReports.name | translate for parameterOfReports in showParametersOfReports"></select></label></div><br><div style="overflow-x: auto;"><table class="table table-bordered"><thead><tr><th><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th>{{ "REPORTRESULT_TRANSACTIONDATE" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_TRANSACTIONDATE\' | translate }}"></a></th><th>{{ "REPORTRESULT_ASSIGNMENTDATE" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_ASSIGNMENTDATE\' | translate }}"></a></th><th>{{ "REPORTRESULT_LOCATION" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT__LOCATION\' | translate }}"></a></th><th>{{ "REPORTRESULT_USERNAME" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_USERNAME\' | translate }}"></a></th><th>{{ "REPORTRESULT_FORM" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_FORM\' | translate }}"></a></th><th>{{ "REPORTRESULT_TASK" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_TASK\' | translate }}"></a></th><th>{{ "REPORTRESULT_UNIQUEID" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_UNIQUEID\' | translate }}"></a></th><th>{{ "REPORTRESULT_REPORT" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_REPORT\' | translate }}"></a></th><th>{{ "REPORTRESULT_DETAIL" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_REPORT_REPORTRESULT_DETAIL\' | translate }}"></a></th><th>{{ "REPORTRESULT_STATUS" | translate }}</th></tr><tr><th></th><th><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{ format }}" ng-model="reportVariables.controlDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC\'}" is-open="popup1.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span><button type="button" class="btn btn-sm btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button></span></div></th><th><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{ format }}" ng-model="reportVariables.assignmentDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC\'}" is-open="popup2.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span><button type="button" class="btn btn-sm btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button></span></div></th><th></th><th><input ng-model="reportVariables.userName" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="reportVariables.applicationName" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="reportVariables.taskName" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="reportVariables.barcode" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ "TABLE_SEARCHBUTTON" | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ "TABLE_REMOVEFILTERBUTTON" | translate }}</button></th><th></th><th></th></tr></thead><tbody><tr ng-repeat="report in displayedAllReports | orderBy:\'controlDate\':true" class="no-top-border"><td></td><td>{{ report.controlDate || " -" | date: "dd-MM-yyyy HH:mm" }}</td><td>{{ report.assignment.assignmentDate || " -" | date: "dd-MM-yyyy HH:mm" }}</td><td><a href="http://maps.google.com/?q={{ report.coordinateX || \'-\' }},{{ report.coordinateY || \'-\' }}" target="_blank">{{ "LINK_SHOWLOCATION" | translate }}</a></td><td>{{ report.userName || "-" }}</td><td>{{ report.applicationName || "-" }}</td><td>{{ report.assignment.name || "-" }}</td><td>{{ report.barcode || " -" }}</td><td><a id="click-link" ng-click="getReport(report.applicationId,report.controlMetadataId)">{{ "REPORTRESULT_REPORT" | translate }}</a></td><td><a id="click-link" ng-click="showFormData(report.formComponentData,report.applicationId,report.version)">{{ "REPORTRESULT_DETAIL" | translate }}</a></td><td class="report-result-link"><a ng-hide="report.assignment.decisionStatus" ng-click="report.assignment && approvedReport(report.assignment)" ng-class="report.assignment ? \'ion-checkmark-round\' : \' ion-checkmark-round disabled-report-icon\'"></a> <a ng-hide="report.assignment.decisionStatus" style="padding-left: 23%;" ng-class="report.assignment ? \'ion-ios-undo\' : \' ion-ios-undo disabled-report-icon\'" ng-click="report.assignment && sendAssignmentBackModal(report)" uib-tooltip="{{ \'SENDASSIGNMENT_BACK_REJECT_BUTTON\' | translate }}"></a><div class="report-status-rejected" ng-show="report.assignment.decisionStatus == 1" translate="{{ \'REPORT_STATUS_REJECTED\' }}"></div><div class="report-status-approved" ng-show="report.assignment.decisionStatus == 0" translate="{{ \'REPORT_STATUS_APPROVED\' }}"></div></td></tr></tbody></table></div><div class="table-pagination"><ul uib-pagination="" ng-change="getReports()" items-per-page="pagination.itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="pagination.bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div><div id="preloader" ng-show="isLoading"><div></div></div></div></div></div>'), e.put("app/pages/report/report-result/viewReport.html", '<div class="panel"><div class="panel-body"><div class="btn-group"><button type="button" ng-click="goBack()" class="btn btn-default"><i class="ion-arrow-left-c tab-top-icon"></i> {{ \'BACK_BUTTON\' | translate}}</button></div><br><br><div id="tpl-content" ng-include="\'app/form-page/form-page.html\'"></div></div></div>'), e.put("app/pages/report/report-design/confirmDocumentUpdateModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="confirmForm"><div class="modal-body">{{ \'REPORTDESIGN_UPDATEDOCCONFIRMMESSAGE\' | translate }}</div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="yes()">{{ \'CONFIRM_YESBUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/report/report-design/confirmSaveModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="confirmForm"><div class="modal-body">{{ \'REPORTDESIGN_REPORTSAVECONFIRMMESSAGE\' | translate }}</div><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="no()">{{ \'CONFIRM_NOBUTTON\' | translate }}</button> <button type="button" class="btn btn-primary" ng-click="yes()">{{ \'CONFIRM_YESBUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/report/report-design/report-design.html", '<meta charset="UTF-8"><div id="preloader" ng-show="isLoadingInReportPage"><div></div></div><md-tabs md-dynamic-height="" md-border-bottom="" md-selected="selectedIndexTab"><md-tab id="step1" label="{{ \'REPORTDESIGN_TAB1\' | translate }}" ng-disabled="true"><br><md-content class="md-padding"><div ng-controller="reportDesignCTRL"><div class="form-group"><ui-select ng-model="selectedApp.content" on-select="checkIfSelected(selectedApp)"><ui-select-match placeholder="{{ \'REPORTDESIGN_CHOOSEAPP\' | translate }}">{{selectedApp.content.key}}</ui-select-match><ui-select-choices repeat="app in allApplications | filter: {key: $select.search}"><div ng-bind-html="app.key | highlight: $select.search"></div></ui-select-choices></ui-select></div><div style="text-align: right" class="form-group"><button class="btn btn-primary" ng-click="continueWithApp()" ng-disabled="disableNextButton">{{ \'REPORTDESIGN_CONTINUE\' | translate }}</button></div></div></md-content></md-tab><md-tab label="{{ \'REPORTDESIGN_TAB2\' | translate }}" ng-disabled="true"><md-content class="md-padding"><div ng-controller="reportDesignTab2CTRL"><label for="sel1">{{ \'REPORTDESIGN_TAB2HEADER\' | translate }}</label><div class="form-group" style="text-align: right"><button type="submit" class="btn btn-primary" ng-click="newRow()">{{ \'REPORTDESIGN_TEMPLATE_ADDBUTTON\' | translate }}</button> <button class="btn btn-primary" ng-click="updateRow(currentRow)" ng-disabled="disableRemoveButton">{{ \'REPORTDESIGN_UPDATEROWBUTTON\' | translate }}</button> <button class="btn btn-danger" ng-click="removeRow(currentRow)" ng-disabled="disableRemoveButton">{{ \'REPORTDESIGN_TEMPLATE_DELETEBUTTON\' | translate }}</button></div><table class="table table-bordered" st-table="templateList"><thead><tr><th>{{ \'REPORTDESIGN_TEMPLATEURL\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_REPORT_DESIGNREPORT_TEMPLATEURL\' | translate}}"></a></th><th class="col-md-3">{{ \'REPORTDESIGN_ADDFILE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_REPORT_DESIGNREPORT_ADDFILE\' | translate}}"></a></th><th class="col-md-3" style="text-align:center;">{{ \'REPORTDESIGN_UPLOADFILE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_REPORT_DESIGNREPORT_UPLOADFILE\' | translate}}"></a></th><th class="col-md-1">{{ \'REPORTDESIGN_SELECTEDCOLUMN\' | translate }}</th></tr></thead><tbody><tr ng-repeat="template in templateList"><td><a ng-click="getFile(template.fileName)">{{template.fileName}}</a></td><td><div style="text-align:center;"><input type="file" fileread="myFile"></div></td><td><div style="text-align:center;"><button class="btn btn-primary" ng-click="uploadFile($index,template.id)" ng-disabled="template.disabled">{{ \'REPORTDESIGN_UPLOADFILEBUTTON\' | translate }}</button></div></td><td><div style="text-align:center;"><input type="radio" ng-click="selectedRow($index)" name="selection"></div></td></tr></tbody></table><br><br><br><div style="text-align: right" class="form-group"><button class="btn btn-primary" ng-click="goToPreviousTab()">{{ \'REPORTDESIGN_BACK\' | translate }}</button> <button class="btn btn-primary" ng-click="continueWithSelectedTemplate()" ng-disabled="disableNextButton">{{ \'REPORTDESIGN_CONTINUE\' | translate }}</button></div></div></md-content></md-tab><md-tab label="{{ \'REPORTDESIGN_TAB3\' | translate }}" ng-disabled="true"><br><md-content class="md-padding"><div ng-controller="reportDesignTab3CTRL"><div class="offset-height10"></div><div id="step6" class="span6 col-sm-12 text-right"><div style="text-align: right"><button class="btn btn-default" ng-click="backButton()">{{ \'REPORTDESIGN_BACK\' | translate }}</button> <button class="btn btn-primary" ng-click="save()">{{ \'REPORTDESIGN_SAVE\' | translate }}</button></div></div><div class="offset-height10"></div><hr><div class="offset-height20"></div><div class="col-sm-4"><div class="panel panel-default design mini"><div class="panel-heading panel-fixed-mini">{{ \'REPORTDESIGN_REPORTDATA\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_REPORT_DESIGNREPORT_REPORTDATA\' | translate}}"></a></div><div class="panel-body"><div class="clearfix"><label class="col-sm-6 control-label mt7">{{ \'REPORTDESIGN_SELECTEDTEMPLATE\' | translate }}: <a ng-href="{{selectedTemplate.url}}">{{lastSelectedRow.fileName}}</a></label><div class="col-sm-6"><div id="step3" class="span6"><div class="add-row-editable-table"><button class="btn btn-primary center-block" ng-click="addNewRow()">{{ \'REPORTDESIGN_ADDNEWROW\' | translate }}</button></div></div></div><div id="step4" class="span6"><table class="table design" st-table="rows" st-safe-src="reportRows"><tbody><tr data-ng-repeat="row in rows | filter:filterValidation track by $index" ng-class="row.valid ? \'editable-row\' : \'invalid-parameter editable-row\'"><td><div class="col-sm-5"><a ng-click="selectParameter(row.key,$index)">{{row.key}}</a></div><div class="col-sm-4"><span e-name="value" e-form="rowform" e-required="" id="{{$index}}" ondrop="angular.element(this).scope().dropColumn(event)" ondragover="angular.element(this).scope().dragOver(event)">{{ row.value || \'drop here\' }}</span><div ng-include="" src="component.htmlComponent"></div></div><div class="col-sm-3"><form editable-form="" name="rowform" ng-show="!rowform.$visible" class="form-buttons form-inline" shown="inserted == reportRows"><button class="btn btn-danger editable-table-button btn-xs" ng-click="removeSelectedRow(row.key)">{{ \'REPORTDESIGN_DELETEROWBUTTON\' | translate }}</button></form></div></td></tr></tbody></table></div></div></div></div></div><div class="col-sm-8"><div class="panel panel-default design"><div class="panel-heading panel-fixed">{{ \'REPORTDESIGN_FORMDATA\' | translate }}<aclass="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_REPORT_DESIGNREPORT_FORMDATA\' | translate}}"></aclass="ion-information-circled"></div><div id="step5" class="span6"><div class="panel-body"><md-tabs md-selected="selectedIndex" md-border-bottom="" class="design-report"><md-tab md-no-ink="" ng-repeat="page in selectedAppStructure.pages" label="{{page.title}}" ng-disabled="page.disabled" md-on-select="setCurrentPage(page)"><div data-ng-repeat="form in page.forms track by $index" class="viewReport-content form-style"><h4 ng-if="form.title != \'\'" align="center"><b>{{form.title}}</b></h4><ng-form name="form.shortName"><div class="row responsive-sm" data-ng-repeat="row in form.rows"><div data-ng-repeat="component in row.components" class="col {{component.colSize}}"><div ng-switch="" on="component.type" ng-init="shortName=component.shortName;"><div ng-switch-when="Text"><div ng-bind-html="createHTMLForText(component.options)"></div></div><div ng-switch-when="TextBox"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><label class="item item-input item-stacked-label"><span ng-if="haveHeader" class="input-label">{{header}}</span> <input type="text" name="name{{component.shortName}}" ng-readonly="true" ng-model="formData[component.shortName]"></label><br></div></div><div ng-switch-when="Button"><input type="button" metadata="component.options"></div><div ng-switch-when="TextArea"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><label class="item item-input"><textarea ng-readonly="true" ng-model="formData[component.shortName]">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</textarea></label></div></div><div ng-switch-when="CheckBox"><div ng-init="parseStringObjectToJsonObject(component.shortName,formData)"></div><div ng-repeat="option in component.options track by $index"><div ng-if="option.type == \'label\' && option.key != \'\'"><div class="item item-divider">{{option.key}}</div></div><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}_$_{{option.name}}"><div ng-if="option.type==\'Option\'"><ion-list><ion-checkbox onclick="return false;" ng-checked="componentValues[component.shortName][option.key] == option.name">{{option.key}}</ion-checkbox></ion-list></div></div></div></div><div ng-switch-when="RadioButton"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div ng-repeat="option in component.options | filter : option.type = \'label\'"><div ng-if="option.key!= \'\'" class="item item-divider">{{option.key}}</div></div><br><div ng-repeat="option in component.options | filter: { type: \'Option\'}" style="padding-left: 12px;"><label class="palette-radio-label"><input class="palette-radio" type="radio" ng-value="option.name" metadata="component.options" name="name{{component.shortName}}" disabled="">&nbsp;&nbsp;{{option.key}}<br></label></div></div></div><div ng-switch-when="SelectBox"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div class="list"><label class="item item-select"><div ng-repeat="option in component.options | filter : option.type =\'label\'"><div class="input-label">{{option.key}}</div></div><select ng-disabled="true" ng-options="option.name as option.key for option in component.options | filter : option.type = \'Option\'" ng-model="formData[component.shortName]"></select></label></div></div></div><div ng-switch-when="MultiSelectBox" ng-init="checkName=component.shortName"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div class="list"><a class="item item-icon-right" ng-click="openMultipleSelectModal(component)">{{\'MULTISELECT_BUTTONNAME\' | translate }} <i class="icon ion-android-arrow-dropdown"></i></a></div></div></div><div ng-switch-when="BarcodeReader"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}" class="item item-input-inset" style="margin-left: 2%; height: 85px;"><div class="row"><div class="col col-67"><label class="item-input-wrapper"><input type="text" metadata="component.options" name="barcodeInput" ng-model="formData[component.shortName]" ng-readonly="true"></label></div><div class="col"><input type="button" class="button button-small" style="margin-top: 15px; width: 95%; background-color: #ccd8ff; float: right;" value="Tara" ng-readonly="true"></div></div></div></div><div ng-switch-when="Camera"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div metadata="component.options"></div><button type="button" onclick="return false;" class="button button-block btn-info center-block {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}">{{buttonName[component.shortName]}}</button><div ng-show="formData[component.shortName].length>0" class="photobox"><ion-scroll overflow-scroll="false" zooming="false" direction="y" style="height:15vh"><div ng-repeat="picture in formData[component.shortName] track by $index" class="container"><div class="gallery"><img class="image" ng-click="showPicture($index,component.shortName)" ng-src="{{imageURL + picture.name}}"></div></div></ion-scroll></div></div></div><div ng-switch-when="DetailCamera"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div metadata="component.options"></div><button type="button" style="margin-bottom: auto;" onclick="return false" class="button button-block btn-info {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}">{{buttonName[component.shortName]}}</button><div ng-show="formData[component.shortName].length>0" class="photobox"><ion-scroll overflow-scroll="false" zooming="false" direction="y" style="height:15vh"><div ng-repeat="picture in formData[component.shortName] track by $index" class="container"><span ng-click="page.deletePicture($index,picture,component.shortName)" class="ion-close-circled topright"></span><div class="gallery"><img class="resize_fit_center image" ng-click="showPicture($index,component.shortName)" ng-src="{{imageURL + picture.name}}" width="100" height="10"><div class="desc">{{picture.description}}</div></div></div></ion-scroll></div></div></div><div ng-switch-when="Info" style="width:100%"><div class="info-component"><span class="ion ion-information-circled info-component-icon"></span></div></div><div ng-switch-when="Signature"><div class="signatureArea" draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div class="signatureArea-header"><h6 class="signature-component-text">Signature</h6></div><div ng-if="formData[component.shortName].length > 0" class="signatureArea-image"><img height="250" ng-src="{{imageURL+ formData[component.shortName][0].name}}"></div><hr class="signatureArea-sign-hr"><br></div></div><div ng-switch-when="Video"><div draggable="true" ondragstart="angular.element(this).scope().drag(event)" id="{{component.shortName}}"><div metadata="component.options"></div><button type="button" style="margin-bottom: auto;" class="button button-block {{buttonColor[component.shortName]}} {{buttonStyle[component.shortName]}}">{{buttonName[component.shortName]}}</button><div ng-show="formData[component.shortName].length > 0" class="videobox"><div ng-repeat="video in formData[component.shortName] track by $index"><div class="report-video"><video width="100%" height="150" controls="controls" id="video"><source ng-src="{{imageURL + video.name}}" type="video/mp4"></video></div></div></div></div></div><div ng-switch-default=""></div></div></div></div></ng-form></div></md-tab></md-tabs></div></div></div></div></div></md-content></md-tab></md-tabs>'), e.put("app/pages/task-management/assign-task-and-equipment/assign-task-and-equipment.html", '<div ng-controller="assignTaskAndEquipmentCTRL"><div class="btn-group" id="dashboard-button-group" style="padding-left: 93%;"><div>{{ "DASHBOARD_CRITICAL_PERCENTAGE" | translate }}</div><select name="criticalSelect" class="form-control" id="criticalSelect" ng-model="selectedCriticalOption.value" ng-options="option.id as option.value for option in allCriticalOptionList"></select></div><br><br><div class="panel"><div class="panel-body"><uib-tabset active="active"><uib-tab index="0" heading="{{ \'ASSIGNTASKPAGE_TAB_1\' | translate }}"><div class="row"><div class="col-md-6"><div class="form-group has-feedback"><div class="form-group row clearfix"><label for="userName" class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLEUSERS" | translate }}</label><div class="col-sm-9"><select name="userSelect" class="form-control" id="userSelect" ng-model="taskInformation.user" ng-change="selectedApplication(); userChangeEvent();" ng-options="user as user.userName for user in allUsers track by user.id"><option value="">-- choose user --</option></select></div></div></div><div class="form-group has-feedback"><div class="form-group row clearfix"><label for="formName" class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLENAME" | translate }}</label><div class="col-sm-9"><select class="form-control" multiple="" name="multipleSelect" id="multipleSelect" ng-model="multipleSelect.data" ng-change="applicationChangeEvent();" ng-options="application as application.name for application in allApplications track by application.id"><option value="" translate="{{ defaultOption }}" disabled=""></option></select></div></div></div></div><div class="col-md-6"><div class="form-group has-feedback"><div class="form-group row clearfix">{{ "ASSIGNTASKPAGE_MULTISELECT_COUNT" | translate }} {{ selectedCount }}</div></div></div></div></uib-tab><uib-tab index="1" heading="{{ \'ASSIGNTASKPAGE_TAB_2\' | translate }}" disable="!isFirstTabValid"><div class="row"><div class="col-md-6"><div class="form-group row clearfix has-feedback"><label for="inputEmail" class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLETASK" | translate }}</label><div class="col-sm-9"><input type="text" name="taskName" ng-model="taskInformation.name" class="form-control" id="taskName"></div></div><div class="form-group row clearfix"><label for="inputAddress" class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLEDESCRIPTION" | translate }}</label><div class="col-sm-9"><textarea class="form-control" ng-model="taskInformation.description" id="description" name="description"></textarea></div></div></div><div class="col-md-6"><div class="form-group row clearfix has-feedback"><label class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLESTARTDATE" | translate }}</label><div class="col-sm-9"><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{ format }}" ng-model="taskInformation.assignmentDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC+3\'}" is-open="popup2.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span><button type="button" class="btn btn-sm btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button></span></div></div></div><div class="form-group row clearfix has-feedback"><label class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLEEXPIREDATE" | translate }}</label><div class="col-sm-9"><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{ format }}" ng-model="taskInformation.expireDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC+3\'}" is-open="popup3.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span><button type="button" class="btn btn-sm btn-default" ng-click="open3()"><i class="glyphicon glyphicon-calendar"></i></button></span></div></div></div></div></div></uib-tab><uib-tab index="2" heading="{{ \'ASSIGNTASKPAGE_TAB_3\' | translate }}" disable="!isSecondTabValid()"><div class="row"><div class="col-md-6"><div class="form-group row clearfix has-feedback"><label for="equipmentType" class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLEEQUIPMENT" | translate }}</label><div class="col-sm-9"><select name="equipmentSelect" class="form-control" id="equipmentSelect" ng-model="taskInformation[\'equipmentType\']" ng-options="equipmentType as equipmentType.name for equipmentType in allEquipmentTypes track by equipmentType.id"><option label="{{ \'ASSIGNTASKPAGE_DEFAULT_SELECT_TEXT\' | translate }}" value="" selected="selected"></option></select></div></div><div class="form-group row clearfix has-feedback"><label for="barcode" class="col-sm-3 control-label">{{ "ASSIGNTASKPAGE_TABLEBARCODE" | translate }}</label><div class="col-sm-9"><input type="text" name="barcode" ng-model="taskInformation[\'barcode\']" class="form-control" id="barcode"></div></div></div></div><div style="float: right"><button type="button" ng-click="clearForm();$parent.$parent.active = 0" class="btn btn-primary">{{ "CLEAR_BUTTON" | translate }}</button> <button type="submit" ng-disabled="isAssignmentSave" ng-click="saveAssignment()" class="btn btn-primary btn-with-icon"><i class="ion-android-checkmark-circle"></i> {{ buttonName }}</button></div></uib-tab></uib-tabset></div></div><div class="panel"><div class="panel-body table-responsive"><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{ "TABLE_ROWSONPAGE" | translate }}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered table-topSpace"><thead><tr><th></th><th>{{ "ASSIGNTASKPAGE_TABLENAME" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLENAME\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLEVERSION" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEVERSION\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLEUSERS" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEUSERS\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLETASK" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLETASK\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLEDESCRIPTION" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEDESCRIPTION\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLEBARCODE" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEBARCODE\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLEEQUIPMENT" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLEEQUIPMENT\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLESTARTDATE" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLESTARTDATE\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLEEXPIREDATE" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_TABLESTARTDATE\' | translate }}"></a></th><th>{{ "ASSIGNTASKPAGE_TABLETASK_STATUS" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ASSIGNTASKANDEQUIPMENT_STATUS\' | translate }}"></a></th><th></th></tr><tr><th><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th><input ng-model="formName" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="formVersion" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="userName" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="taskName" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="taskDescription" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="barcode" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="equipmentGroup" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th style="position: relative"><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{ format }}" ng-model="assignmentDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC+3\'}" is-open="popup1.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span><button type="button" class="btn btn-sm btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button></span></div></th><th style="position: relative"><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{ format }}" ng-model="expireDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC+3\'}" is-open="popup4.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats"> <span><button type="button" class="btn btn-sm btn-default" ng-click="open4()"><i class="glyphicon glyphicon-calendar"></i></button></span></div></th><th></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ "TABLE_SEARCHBUTTON" | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ "TABLE_REMOVEFILTERBUTTON" | translate }}</button></th></tr></thead><tbody><tr ng-repeat="assignment in displayedUserAssignments" ng-class="{\'critical_row\': assignment.stateOfControl == taskStatus.CRITICAL}" class="editable-row"><td></td><td>{{ assignment.application.name }}</td><td>{{ assignment.application.version.version }}</td><td>{{ assignment.user.userName }}</td><td>{{ assignment.name }}</td><td>{{ assignment.description }}</td><td>{{ assignment.barcode }}</td><td>{{ assignment.equipmentType.name || " -" }}</td><td>{{ assignment.assignmentDate | date: "dd-MM-yyyy" }}</td><td>{{ assignment.expireDate | date: "dd-MM-yyyy" }}</td><td><div ng-if="assignment.stateOfControl == taskStatus.COMPLETED">{{ "TASK_COMPLETED" | translate }}</div><div ng-if="assignment.stateOfControl == taskStatus.INCOMPLETED">{{ "TASK_INCOMPLETED" | translate }}</div><div ng-if="assignment.stateOfControl == taskStatus.LATE">{{ "TASK_LATE" | translate }}</div><div ng-if="assignment.stateOfControl == taskStatus.ONTIME">{{ "TASK_ONTIME" | translate }}</div><div ng-if="assignment.stateOfControl == taskStatus.CRITICAL">{{ "TASK_CRITICAL" | translate }}</div></td><td><div class="buttons" ng-show="!rowform.$visible"><button class="btn btn-primary editable-table-button btn-xs" ng-click="editAssignment(assignment,$index)">{{ "TABLE_EDITBUTTON" | translate }}</button> <button class="btn btn-danger editable-table-button btn-xs" ng-click="removeAssignment(assignment.id,$index)">{{ "TABLE_DELETEBUTTON" | translate }}</button></div></td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getTasks()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div><div id="preloader" ng-show="isLoading"><div></div></div></div></div></div>'), e.put("app/pages/task-management/assign-task-and-equipment/assignTaskAndEquipmentModal.html", '<div class="modal-content"><div class="modal-header bg-danger"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="assignTaskForm"><div class="modal-body"><p>{{ \'ASSIGNTASKPAGE_MODALMESSAGE\' | translate }}</p></div><div class="modal-footer"><button type="submit" set-focus-default="" class="btn btn-danger" ng-click="$dismiss()">{{ \'TABLE_OKEYBUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/user/add-new-user/add-new-user.html", '<div ng-controller="addNewUserCTRL"><div ba-panel=""><div class="panel-content"><form name="personalInfoForm.user"><h3 class="with-line">{{ \'PROFILE_USERHEADER\' | translate }}</h3><div class="row"><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.name.$invalid && (personalInfoForm.user.name.$dirty || personalInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputFirstName" class="col-sm-3 control-label">{{ \'PROFILE_NAME\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'name\']" name="name" class="form-control" id="inputFirstName" required=""> <span class="help-block error-block basic-block">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span></div></div></div><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.surname.$invalid && (personalInfoForm.user.surname.$dirty || personalInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputLastName" class="col-sm-3 control-label">{{ \'PROFILE_SURNAME\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'surname\']" name="surname" class="form-control" id="inputLastName" required=""> <span class="help-block error-block basic-block">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span></div></div></div><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.tcNo.$invalid && (personalInfoForm.user.tcNo.$dirty || personalInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputTCNo" class="col-sm-3 control-label">{{ \'PROFILE_TC\' | translate }}</label><div class="col-sm-9"><input type="text" name="tcNo" ng-model="userInformation[\'tcNumber\']" class="form-control" id="inputTCNo" ng-pattern="/^[0-9]{11}$/" ng-change="setFocused()" required=""> <span class="help-block error-block basic-block" ng-show="personalInfoForm.user.tcNo.$error.required">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span> <span class="help-block error-block basic-block" ng-show="personalInfoForm.user.tcNo.$error.pattern && personalInfoForm.user.$submitted">{{ \'VALIDFIELD_ERROR\' | translate }}</span></div></div></div></div><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': personalInfoForm.user.username.$invalid && (personalInfoForm.user.username.$dirty || personalInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputUserName" class="col-sm-3 control-label">{{ \'PROFILE_USERNAME\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'userName\']" name="username" class="form-control" id="inputUserName" required=""> <span class="help-block error-block basic-block" ng-show="personalInfoForm.user.username.$error.required && (personalInfoForm.user.username.$dirty || personalInfoForm.user.$submitted)">Bu alanın doldurulması zorunludur.</span> <span ng-if="userexist" class="help-block error-block basic-block">{{ \'USEREXISTS_ERROR\' | translate }}</span></div></div></div><div class="form-group row clearfix"><label class="col-sm-3 control-label">{{ \'PROFILE_COMPANY\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'companyName\']" class="form-control" id="inputCompanyName" placeholder=""></div></div><div class="form-group row clearfix"><label for="inputOccupation" class="col-sm-3 control-label">{{ \'PROFILE_OCCUPATION\' | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformation[\'occupation\']" class="form-control" id="inputOccupation"></div></div></div></div><h3 class="with-line">{{ \'PROFILE_CONTACTHEADER\' | translate }}</h3><div class="row"><div class="col-md-6"><div class="form-group row clearfix has-feedback" ng-class="{\'has-error\': personalInfoForm.user.email.$invalid && (personalInfoForm.user.email.$dirty || personalInfoForm.user.$submitted)}"><label for="inputEmail" class="col-sm-3 control-label">{{ \'PROFILE_EMAIL\' | translate }}</label><div class="col-sm-9"><input type="email" name="email" ng-model="userInformation[\'email\']" class="form-control" id="inputEmail" required=""> <span class="error help-block error-block basic-block" ng-show="personalInfoForm.user.email.$error.required && (personalInfoForm.user.email.$dirty || personalInfoForm.user.$submitted)">{{ \'REQUIREDFIELD_ERROR\' | translate }}</span> <span class="error help-block error-block basic-block" ng-show="personalInfoForm.user.email.$error.email && personalInfoForm.user.$submitted">{{ \'VALIDEMAIL_ERROR\' | translate }}</span> <span ng-if="emailexist" class="help-block error-block basic-block">{{ \'EMAILEXIST_ERROR\' | translate }}</span></div></div><div class="form-group row clearfix"><label for="inputAddress" class="col-sm-3 control-label">{{ \'PROFILE_ADDRESS\' | translate }}</label><div class="col-sm-9"><textarea class="form-control" ng-model="userInformation[\'address\']" id="inputAddress" name="address"></textarea></div></div></div><div class="col-md-6"><div class="form-group row clearfix has-feedback" ng-class="{\'has-error\': personalInfoForm.user.telNo.$invalid && (personalInfoForm.user.telNo.$dirty || personalInfoForm.user.$submitted)}"><label class="col-sm-3 control-label">{{ \'PROFILE_PHONE\' | translate }}</label> <input style="width:350px" name="telNo" type="tel" ng-model="userInformation[\'phoneNumber\']" class="form-control" id="inputPhone" placeholder="(999) 999-9999" mask="(999) 999-9999"> <span style="padding-left:130px" class="error help-block error-block basic-block" ng-show="personalInfoForm.user.email.$invalid">{{ \'VALIDPHONEFIELD_ERROR\' | translate }}</span></div></div></div><button type="submit" ng-click="personalInfoForm.user.$valid && saveUserInformation()" class="btn btn-primary btn-with-icon"><i class="ion-android-checkmark-circle"></i>{{ \'ADD_BUTTON\' | translate }}</button></form></div></div><div id="preloader" ng-show="isLoading"><div></div></div></div>'), e.put("app/pages/user/list-and-edit-user-information/list-and-edit-user-information.html", '<div class="add-row-editable-table" ng-controller="listAndEditUserInformationCTRL"><div class="panel"><div class="panel-body"><form name="userInfoForm.user"><uib-tabset active="active"><uib-tab index="0" heading="{{ \'PROFILE_USERHEADER\' | translate }}"><div class="row"><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': userInfoForm.user.name.$invalid && (userInfoForm.user.name.$dirty || userInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputFirstName" class="col-sm-3 control-label">{{ "PROFILE_NAME" | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformationJSON[\'name\']" name="name" class="form-control" id="inputFirstName" required=""> <span class="help-block error-block basic-block">{{ "REQUIREDFIELD_ERROR" | translate }}</span></div></div></div><div class="form-group has-feedback" ng-class="{\'has-error\': userInfoForm.user.surname.$invalid && (userInfoForm.user.surname.$dirty || userInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputLastName" class="col-sm-3 control-label">{{ "PROFILE_SURNAME" | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformationJSON[\'surname\']" name="surname" class="form-control" id="inputLastName" required=""> <span class="help-block error-block basic-block">{{ "REQUIREDFIELD_ERROR" | translate }}</span></div></div></div><div class="form-group has-feedback" ng-class="{\'has-error\': userInfoForm.user.tcNo.$invalid && (userInfoForm.user.tcNo.$dirty || userInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputTCNo" class="col-sm-3 control-label">{{ "PROFILE_TC" | translate }}</label><div class="col-sm-9"><input type="text" name="tcNo" ng-model="userInformationJSON[\'tcNumber\']" class="form-control" id="inputTCNo" ng-pattern="/^[0-9]{11}$/" ng-change="setFocused()" required=""> <span class="help-block error-block basic-block" ng-show="userInfoForm.user.tcNo.$error.required">{{ "REQUIREDFIELD_ERROR" | translate }}</span> <span class="help-block error-block basic-block" ng-show="userInfoForm.user.tcNo.$error.pattern && userInfoForm.user.$submitted">{{ "VALIDFIELD_ERROR" | translate }}</span></div></div></div></div><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': userInfoForm.user.username.$invalid && (userInfoForm.user.username.$dirty || userInfoForm.user.$submitted)}"><div class="form-group row clearfix"><label for="inputUserName" class="col-sm-3 control-label">{{ "PROFILE_USERNAME" | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformationJSON[\'userName\']" name="username" class="form-control" id="inputUserName" required=""> <span class="help-block error-block basic-block" ng-show="userInfoForm.user.username.$error.required && (userInfoForm.user.username.$dirty || userInfoForm.user.$submitted)">Bu alanın doldurulması zorunludur.</span> <span ng-if="userexist" class="help-block error-block basic-block">{{ "USEREXISTS_ERROR" | translate }}</span></div></div></div><div class="form-group row clearfix"><label class="col-sm-3 control-label">{{ "PROFILE_COMPANY" | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformationJSON[\'companyName\']" class="form-control" id="inputCompanyName" placeholder=""></div></div><div class="form-group row clearfix"><label for="inputOccupation" class="col-sm-3 control-label">{{ "PROFILE_OCCUPATION" | translate }}</label><div class="col-sm-9"><input type="text" ng-model="userInformationJSON[\'occupation\']" class="form-control" id="inputOccupation"></div></div></div></div></uib-tab><uib-tab index="1" heading="{{ \'PROFILE_CONTACTHEADER\' | translate }}"><div class="row"><div class="col-md-6"><div class="form-group row clearfix has-feedback" ng-class="{\'has-error\': userInfoForm.user.email.$invalid && (userInfoForm.user.email.$dirty || userInfoForm.user.$submitted)}"><label for="inputEmail" class="col-sm-3 control-label">{{ "PROFILE_EMAIL" | translate }}</label><div class="col-sm-9"><input type="email" name="email" ng-model="userInformationJSON[\'email\']" class="form-control" id="inputEmail" required=""> <span class="error help-block error-block basic-block" ng-show="userInfoForm.user.email.$error.required && (userInfoForm.user.email.$dirty || userInfoForm.user.$submitted)">{{ "REQUIREDFIELD_ERROR" | translate }}</span> <span class="error help-block error-block basic-block" ng-show="userInfoForm.user.email.$error.email && userInfoForm.user.$submitted">{{ "VALIDEMAIL_ERROR" | translate }}</span> <span ng-if="emailexist" class="help-block error-block basic-block">{{ "EMAILEXIST_ERROR" | translate }}</span></div></div><div class="form-group row clearfix"><label for="inputAddress" class="col-sm-3 control-label">{{ "PROFILE_ADDRESS" | translate }}</label><div class="col-sm-9"><textarea class="form-control" ng-model="userInformationJSON[\'address\']" id="inputAddress" name="address"></textarea></div></div></div><div class="col-md-6"><div class="form-group row clearfix has-feedback" ng-class="{\'has-error\': userInfoForm.user.telNo.$invalid && (userInfoForm.user.telNo.$dirty || userInfoForm.user.$submitted)}"><label class="col-sm-3 control-label">{{ "PROFILE_PHONE" | translate }}</label> <input style="width:350px" name="telNo" type="tel" ng-model="userInformationJSON[\'phoneNumber\']" class="form-control" id="inputPhone" placeholder="(999) 999-9999" mask="(999) 999-9999"> <span style="padding-left:130px" class="error help-block error-block basic-block" ng-show="userInfoForm.user.email.$invalid">{{ "VALIDPHONEFIELD_ERROR" | translate }}</span></div></div></div><div style="float:right"><button type="submit" ng-disabled="saveButtonDisabled" ng-click="userInfoForm.user.$valid && updateUserInformation()" class="btn btn-primary btn-with-icon"><i class="ion-android-checkmark-circle"></i>{{ "SAVE_BUTTON" | translate }}</button></div></uib-tab></uib-tabset></form></div></div><div class="panel"><div class="panel-body" style="overflow-x:auto;"><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{ "TABLE_ROWSONPAGE" | translate }}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered"><thead><tr><th><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th>{{ "USERPAGE_USERNAMEHEADER" | translate }}</th><th>{{ "USERPAGE_USERSURNAMEHEADER" | translate }}</th><th>{{ "USERPAGE_USERTCNOHEADER" | translate }}</th><th>{{ "USERPAGE_CONTACTADDRESSHEADER" | translate }}</th><th>{{ "USERPAGE_CONTACTPHONEHEADER" | translate }}</th><th>{{ "USERPAGE_CONTACTEMAILHEADER" | translate }}</th><th>{{ "USERPAGE_USERUSERNAMEHEADER" | translate }}</th><th>{{ "USERPAGE_USERCOMPANYNAMEHEADER" | translate }}</th><th>{{ "USERPAGE_USEROCCUPATIONHEADER" | translate }}</th><th></th></tr><tr><th></th><th><input ng-model="name" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHNAME\' | translate }}"></th><th><input ng-model="surname" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHSURNAME\' | translate }}"></th><th><input ng-model="tcNumber" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHTCNO\' | translate }}"></th><th><input ng-model="address" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHADRESS\' | translate }}"></th><th><input ng-model="phoneNumber" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHPHONENUMBER\' | translate }}"></th><th><input ng-model="email" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHEMAIL\' | translate }}"></th><th><input ng-model="username" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHUSERNAME\' | translate }}"></th><th><input ng-model="company" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHCOMPANY\' | translate }}"></th><th><input ng-model="occupation" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'LISTANDEDITUSER_SEARCHOCCUPATION\' | translate }}"></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ "TABLE_SEARCHBUTTON" | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ "TABLE_REMOVEFILTERBUTTON" | translate }}</button></th></tr></thead><tbody><tr ng-repeat="user in displayedUserInformation"><td></td><td>{{ user.name || " -" }}</td><td>{{ user.surname || " -" }}</td><td>{{ user.tcNumber || " -" }}</td><td>{{ user.address || " -" }}</td><td>{{ user.phoneNumber || " -" }}</td><td>{{ user.email || " -" }}</td><td>{{ user.userName || " -" }}</td><td>{{ user.companyName || " -" }}</td><td>{{ user.occupation || " -" }}</td><td><button class="btn btn-primary editable-table-button btn-xs" ng-click="editUserInformation(user,$index)">{{ "TABLE_EDITBUTTON" | translate }}</button> <button class="btn btn-danger editable-table-button btn-xs" ng-click="removeUserInformation(user,$index)">{{ "TABLE_DELETEBUTTON" | translate }}</button></td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getUserInformation()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div></div>'), e.put("app/pages/user/user-authorisation/user-authorisation.html", '<div ng-controller="userAuthorisationCTRL"><div class="panel"><div class="panel-body"><br><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{ "TABLE_ROWSONPAGE" | translate }}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered"><thead><tr><th class="table-id"><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th>{{ "USERAUTHORISATION_TABLENAME" | translate }}</th><th>{{ "USERAUTHORISATION_TABLESURNAME" | translate }}</th><th>{{ "USERAUTHORISATION_TABLEUSERNAME" | translate }}</th><th><a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_USEROPERATIONS_USERAUTHORISATION\' | translate }}"></a> {{ "USERAUTHORISATION_TABLEROLE" | translate }}</th><th></th></tr><tr><th></th><th id="table-search-input"><input placeholder="{{ \'USERAUTHORISATION_SEARCHNAME\' | translate }}" style="width:50%;height:70%" class="input-sm form-control search-input" type="search" ng-model="name"></th><th id="table-search-input"><input style="width:50%;height:70%" placeholder="{{ \' USERAUTHORISATION_SEARCHSURNAME\' | translate }}" class="input-sm form-control search-input" type="search" ng-model="surname"></th><th id="table-search-input"><input style="width:50%;height:70%" placeholder="{{ \'USERAUTHORISATION_SEARCHUSERNAME\' | translate }}" class="input-sm form-control search-input" type="search" ng-model="username"></th><th id="table-search-input"><input style="width:50%;height:70%" placeholder="{{ \'USERAUTHORISATION_SEARCHROLE\' | translate }}" class="input-sm form-control search-input" type="search" ng-model="role"></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ "TABLE_SEARCHBUTTON" | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ "TABLE_REMOVEFILTERBUTTON" | translate }}</button></th></tr></thead><tr ng-repeat="user in displayedUsers" class="editable-row"><td></td><td><span e-name="name" e-form="rowform" e-required="">{{ user.name || " -" }}</span></td><td><span e-name="surname" e-form="rowform" e-required="">{{ user.surname || " -" }}</span></td><td><span e-name="userName" e-form="rowform" e-required="">{{ user.userName || " -" }}</span></td><td class="select-td"><span editable-ui-select="user.roles" e-form="rowform" data-e-ng-model="user.roles" data-e-name="roles" name="roles" data-e-style="max-width:400px;" e-multiple="">{{ showUserRoles(user.roles) }}<editable-ui-select-match>{{ $item.roleName }}</editable-ui-select-match><editable-ui-select-choices repeat="role as role in allRoles | filter: $select.search"><span ng-bind-html="role.roleName"></span></editable-ui-select-choices></span></td><td><form editable-form="" name="rowform" ng-show="rowform.$visible" class="form-buttons form-inline" shown="inserted == user"><button type="submit" ng-click="saveUserChanges(rowform,user)" class="btn btn-primary editable-table-button btn-xs">{{ "SAVE_BUTTON" | translate }}</button> <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel();" class="btn btn-default editable-table-button btn-xs">{{ "TABLE_CANCELBUTTON" | translate }}</button></form><div class="buttons" ng-show="!rowform.$visible"><button class="btn btn-primary editable-table-button btn-xs" ng-click="rowform.$show()">{{ "TABLE_EDITBUTTON" | translate }}</button></div></td></tr></table><div class="table-pagination"><ul uib-pagination="" ng-change="getUserInformation()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div></div>'), e.put("app/theme/components/backTop/backTop.html", '<i class="fa fa-angle-up back-top" id="backTop" title="Back to Top"></i>'), e.put("app/theme/components/baSidebar/ba-sidebar.html", '<aside class="al-sidebar" ng-swipe-right="$baSidebarService.setMenuCollapsed(false)" ng-swipe-left="$baSidebarService.setMenuCollapsed(true)" ng-mouseleave="hoverElemTop=selectElemTop"><ul class="al-sidebar-list" slimscroll="{height: \'{{menuHeight}}px\'}" slimscroll-watch="menuHeight"><div ng-if="hasAdminRole === \'true\'"><li ng-repeat="item in ::menuItems | filter:adminMenu" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item" id="{{subitem.title}}"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span translate="{{::subitem.title}}"></span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link" translate="{{::subSubitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}" translate="{{::subSubitem.title}}"></a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link" translate="{{::subitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}" translate="{{::subitem.title}}"></a></li></ul></li></div><div ng-if="hasAdminRole === \'false\'"><div ng-repeat="role in roles"><div ng-if="role.shortName == \'USR\'"><li ng-show="item.title == \'SIDEMENU_TASK\'" ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span translate="{{::subitem.title}}"></span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link" translate="{{::subSubitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}" translate="{{::subSubitem.title}}"></a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link" translate="{{::subitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}" translate="{{::subitem.title}}"></a></li></ul></li><li ng-show="item.title == \'SIDEMENU_FORMS\'" ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span translate="{{::subitem.title}}"></span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link" translate="{{::subSubitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}" translate="{{::subSubitem.title}}"></a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link" translate="{{::subitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}" translate="{{::subitem.title}}"></a></li></ul></li></div><div ng-if="role.shortName == \'RPRTR\'"><li ng-show="item.title == \'SIDEMENU_REPORT\'" ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span translate="{{::subitem.title}}"></span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link" translate="{{::subSubitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}" translate="{{::subSubitem.title}}"></a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link" translate="{{::subitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}" translate="{{::subitem.title}}"></a></li></ul></li></div><div ng-if="role.shortName == \'SPRVSR\'"><li ng-show="item.title == \'SIDEMENU_CONTROLMANAGEMENT\'" ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span translate="{{::item.title}}"></span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span translate="{{::subitem.title}}"></span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link" translate="{{::subSubitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}" translate="{{::subSubitem.title}}"></a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link" translate="{{::subitem.title}}"></a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}" translate="{{::subitem.title}}"></a></li></ul></li></div></div></div></ul><div class="sidebar-hover-elem" ng-style="{top: hoverElemTop + \'px\', height: hoverElemHeight + \'px\'}" ng-class="{\'show-hover-elem\': showHoverElem }"></div></aside>'), e.put("app/theme/components/baWizard/baWizard.html", '<div class="ba-wizard"><div class="ba-wizard-navigation-container"><div ng-repeat="t in $baWizardController.tabs" class="ba-wizard-navigation {{$baWizardController.tabNum == $index ? \'active\' : \'\'}}" ng-click="$baWizardController.selectTab($index)">{{t.title}}</div></div><div class="progress ba-wizard-progress"><div class="progress-bar progress-bar-danger active" role="progressbar" aria-valuemin="0" aria-valuemax="100" ng-style="{width: $baWizardController.progress + \'%\'}"></div></div><div class="steps" ng-transclude=""></div><nav><ul class="pager ba-wizard-pager"><li class="previous"><button ng-disabled="$baWizardController.isFirstTab()" ng-click="$baWizardController.previousTab()" type="button" class="btn btn-primary"><span aria-hidden="true">&larr;</span> previous</button></li><li class="next"><button ng-disabled="$baWizardController.isLastTab()" ng-click="$baWizardController.nextTab()" type="button" class="btn btn-primary">next <span aria-hidden="true">&rarr;</span></button></li></ul></nav></div>'), e.put("app/theme/components/baWizard/baWizardStep.html", '<section ng-show="selected" class="step" ng-transclude=""></section>'), e.put("app/theme/components/contentTop/contentTop.html", '<div class="content-top clearfix"><h1 class="al-title"></h1><div ng-if="activePageTitle == \'SIDEMENU_HOME\'" class="btn-group" id="dashboard-button-group" style="float:right;top: 18px;" ng-controller="dashboardCtrl"><label class="btn btn-success" ng-click="changeDateFilter()" ng-model="dateFilter.value" uib-btn-radio="\'7\'" uib-uncheckable="uncheckable">{{ \'DASHBOARD_FILTER_LAST_1_WEEK\' | translate}}</label> <label class="btn btn-success" ng-click="changeDateFilter()" ng-model="dateFilter.value" uib-btn-radio="\'30\'" uib-uncheckable="uncheckable">{{ \'DASHBOARD_FILTER_LAST_1_MONTH\' | translate}}</label> <label class="btn btn-success" ng-click="changeDateFilter()" ng-model="dateFilter.value" uib-btn-radio="\'90\'" uib-uncheckable="uncheckable">{{ \'DASHBOARD_FILTER_LAST_3_MONTH\' | translate}}</label></div><ul class="breadcrumb al-breadcrumb"><li ng-if="activePageTitle != \'SIDEMENU_HOME\'"><a href="#/dashboard">{{ \'DASHBOARD_CONTENTTOP_HOME\' | translate }}</a></li><li>{{ activePageTitle | translate }}</li></ul></div>'), e.put("app/theme/components/pageTop/pageTop.html", '<div class="page-top clearfix" scroll-position="scrolled" max-height="50" ng-class="{\'scrolled\': scrolled}" style="display: flex; align-items: center; align-content: center;"><a href="#/dashboard" class="al-logo clearfix"><img class="admin-logo" src="app/img/logo.png" height="50"></a> <a href="" class="collapse-menu-link ion-navicon" ba-sidebar-toggle-menu=""></a><img class="admin-logo" src="app/img/logo.png" height="40" style="justify-content: center; margin: 0 auto;"><div class="user-profile clearfix"><div class="flag-icon"><img height="15" width="25" src="app/img/turkey.png" ng-click="changeLanguage(\'tr\')"> <img height="15" width="25" src="app/img/us.png" ng-click="changeLanguage(\'en\')"></div><div class="al-user-profile" uib-dropdown=""><a uib-dropdown-toggle="" class="profile-toggle-link"><span class="user-icon ion-android-person"></span></a><ul class="top-dropdown-menu profile-dropdown" uib-dropdown-menu=""><li><i class="dropdown-arr"></i></li><li class="username-block">{{pageTop.username}}</li><li style="text-align: center;">v2.261121.1</li><li><a href="#/profile"><i class="fa fa-user"></i>{{ \'DASHBOARD_PAGETOP_PROFILE\' | translate }}</a></li><li><a href="#/changePassword"><i class="ion-android-lock"></i>{{\'MENU_CHANGEPASSWORD\' | translate}}</a></li><li><a href="#/logout" class="signout"><i class="fa fa-power-off"></i>{{ \'DASHBOARD_PAGETOP_LOGOUT\' | translate }}</a></li></ul></div></div></div>'), e.put("app/theme/components/msgCenter/msgCenter.html", '<ul class="al-msg-center clearfix"><li uib-dropdown=""><a href="" uib-dropdown-toggle=""><i class="fa fa-bell-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Notifications</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in notifications"><div class="img-area"><img ng-class="{\'photo-msg-item\' : !msg.image}" ng-src="{{::( msg.image || (users[msg.userId].name | profilePicture) )}}"></div><div class="msg-area"><div ng-bind-html="getMessage(msg)"></div><span>{{ msg.time }}</span></div></a></div><a href="">See all notifications</a></div></li><li uib-dropdown=""><a href="" class="msg" uib-dropdown-toggle=""><i class="fa fa-envelope-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Messages</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in messages"><div class="img-area"><img class="photo-msg-item" ng-src="{{::( users[msg.userId].name | profilePicture )}}"></div><div class="msg-area"><div>{{ msg.text }}</div><span>{{ msg.time }}</span></div></a></div><a href="">See all messages</a></div></li></ul>'), e.put("app/theme/components/progressBarRound/progressBarRound.html", '<svg class="center-block progress-bar-round" width="200" height="200"><circle cx="100" cy="100" r="90" fill="none" stroke="#F8F8FF" stroke-width="8"></circle><circle cx="100" cy="100" r="90" fill="none" id="loader" class="" stroke="#209e91" stroke-width="8" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" stroke-linecap="round"></circle><text text-anchor="middle" class="loading" x="100" y="90">Loading...</text><text class="percentage" text-anchor="middle" x="100" y="130">{{progress}}%</text></svg>'), e.put("app/theme/components/widgets/widgets.html", '<div class="widgets"><div ng-repeat="widgetBlock in ngModel" ng-class="{\'row\': widgetBlock.widgets.length > 1}"><div ng-repeat="widgetCol in widgetBlock.widgets" ng-class="{\'col-md-6\': widgetBlock.widgets.length === 2}" ng-model="widgetCol" class="widgets-block"><div ba-panel="" ba-panel-title="{{::widget.title}}" ng-repeat="widget in widgetCol" ba-panel-class="with-scroll {{widget.panelClass}}"><div ng-include="widget.url"></div></div></div></div></div>'), e.put("app/theme/inputs/baSwitcher/baSwitcher.html", '<label class="switcher-container"><input type="checkbox" ng-model="switcherValue"><div class="switcher" ng-class="::switcherStyle"><div class="handle-container"><span class="handle handle-on">ON</span> <span class="handle"></span> <span class="handle handle-off">OFF</span></div></div></label>'), e.put("app/pages/report/report-result/documentsModal/allDocumentsModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><table class="table"><tbody><tr><td>{{\'REPORT_DOCUMENTMODAL_STATUS\' | translate}} : {{ reportStatus}}</td><br><td><button class="fa fa-refresh" ng-click="reloadModal()">{{\'REFRESH_BUTTON\' | translate}}</button></td></tr></tbody></table><br><table class="table table-striped" st-table="allDocuments"><thead><tr class="black-muted-bg"><th>{{ \'REPORT_DOCUMENTMODAL_TABLENAME\' | translate }}</th><th></th></tr></thead><tbody><tr ng-repeat="document in allDocuments" class="editable-row"><td id="smartTable-td">{{document.fileName}}</td><td id="smartTable-td"><button class="btn btn-primary" ng-click="getReportResults(document.id)" ng-disabled="isDisabled">{{\'CREATE_BUTTON\' | translate}}</button></td></tr></tbody><tfoot><tr><td colspan="5" class="text-center"><div st-pagination="" st-items-by-page="5" st-displayed-pages="5"></div></td></tr></tfoot></table></div></div>'), e.put("app/pages/report/report-result/informationModal/informationModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><div ng-bind-html="informationModalContent"></div></div></div>'), e.put("app/pages/report/report-result/imageModal/imageModal.html", '<div class="modal-content image-modal transparent"><img ng-src="{{imageSrc}}" class="fullscreen-image"></div>'), e.put("app/pages/report/report-result/multipleSelectModal/multipleSelectModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button><h4 class="modal-title" id="myModalLabel"><div ng-repeat="option in component.options | filter:{type:\'Label\'} track by $index">{{option.key}}</div></h4></div><form name="multiSelectForm"><div class="modal-body"><div ng-if="!isFormViewed"><ion-list><ion-checkbox ng-repeat="option in component.options | filter : {type : \'Option\'}" ng-model="formData[component.shortName][option.key]" id="{{component.shortName+$index}}" name="name{{component.shortName+$index}}" ng-true-value="\'{{option.name}}\'" ng-false-value="\'false\'" metadata="component.options" ng-change="isInAdminFormPage && checkMultiOptionsValidation(component.shortName)">{{option.key}}</ion-checkbox></ion-list></div><div ng-if="isFormViewed"><ion-list><ion-checkbox ng-repeat="option in component.options | filter : {type : \'Option\'}" ng-model="formData[component.shortName][option.key]" id="{{component.shortName+$index}}" name="{{component.shortName+$index}}" ng-true-value="\'{{option.name}}\'" ng-false-value="\'false\'" metadata="component.options" onclick="return false;">{{option.key}}</ion-checkbox></ion-list></div></div></form></div>'), e.put("app/pages/report/report-result/sendAssignmentBackModal/sendAssignmentBack.html", '<div class="modal-content" ng-cloak=""><div class="modal-header" style="background-color:#209e91"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><form name="reAssignmentForm" ng-submit="reAssignmentForm.$valid && onSendAssignmentBack()" class="reAssignment-modal-style"><h4 align="center"><b>{{\'ASSIGNTASKPAGE_TAB_2\' | translate}}</b></h4><div class="row"><div class="col-md-4"><div class="form-group has-feedback"><div class="form-group row clearfix"><label for="userName" class="control-label" translate="{{\'SENDASSIGNMENT_BACK_USERNAME\'}}"></label></div></div></div><div class="col-md-8"><select class="form-control show-tick" ng-model="newAssignmentInformation.userId" ng-options="user.id as user.userName for user in applicationUsers"></select></div></div><div class="row"><div class="col-md-4"><div class="form-group has-feedback"><div class="form-group row clearfix"><label for="expireDate" class="control-label" translate="{{\'SENDASSIGNMENT_BACK_EXPIRE_DATE\'}}"></label></div></div></div><div class="col-md-8"><div class="search_date_picker_box"><input type="text" class="input-sm form-control search-input datePicker" uib-datepicker-popup="{{format}}" ng-model="newAssignmentInformation.expireDate" name="expireDate" ng-change="formatDateModal()" ng-model-options="{timezone: \'UTC+3\'}" is-open="popup3.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats" required=""> <span><button type="button" class="btn btn-sm btn-default" ng-click="open3()"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-messages="reAssignmentForm.expireDate.$error" ng-show="reAssignmentForm.$submitted"><div style="color: red" ng-message="required" translate="{{\'REQUIREDFIELD_ERROR\'}}"></div></div></div></div><h4 align="center"><b translate="{{\'SENDASSIGNMENT_BACK_REJECTION_HEADER\'}}"></b></h4><div class="row"><div class="col-md-4"><div class="form-group has-feedback"><div class="form-group row clearfix"><label for="description" class="control-label" translate="{{\'SENDASSIGNMENT_BACK_REJECTION_REASON\'}}"></label></div></div></div><div class="col-md-8"><textarea name="rejectionReason" id="description" ng-model="newAssignmentInformation.description" class="form-control" required="required"></textarea><div ng-messages="reAssignmentForm.rejectionReason.$error" ng-show="reAssignmentForm.$submitted"><div style="color: red" ng-message="required" translate="{{\'REQUIREDFIELD_ERROR\'}}"></div></div></div></div><br><br><button type="submit" class="btn btn-primary btn-block" translate="{{\'SENDASSIGNMENT_BACK_REJECT_BUTTON\'}}"></button></form></div></div>'), e.put("app/pages/report/report-design/parameterListModal/parameterListModal.html", '<div class="modal-content" ng-cloak=""><div class="modal-header" style="background-color:#209e91"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><select ng-model="reportRows[indexOfReportRow].key" ng-init="setTemplate(reportRows[indexOfReportRow].key)" ng-change="checkIsRowValid(indexOfReportRow)" class="form-control"><option ng-repeat="x in alltemplateParamList track by $index" value="{{x}}">{{x}}</option></select></div></div>'), e.put("app/pages/task-management/equipment-operations/add-and-edit-equipment-operations/add-and-edit-equipment-operations.html", '<div ng-controller="addAndEditEquipmentCTRL"><div class="panel"><div class="panel-body"><div class="add-row-editable-table"><button class="btn btn-primary" ng-click="addEquipment()">{{ \'ADD_BUTTON\' | translate }}</button></div><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{\'TABLE_ROWSONPAGE\' | translate}}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered" st-table="displayedEquipment" st-safe-src="allEquipment"><thead><tr><th></th><th>{{ \'ADDEQUIPMENTPAGE_TABLENAME\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_ADDEQUIPMENT_TABLENAME\' | translate}}"></a></th><th>{{ \'ADDEQUIPMENTPAGE_TABLEDESCRIPTION\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_ADDEQUIPMENT_TABLEDESCRIPTION\' | translate}}"></a></th><th>{{ \'ADDEQUIPMENTPAGE_TABLESERIALNUMBER\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_ADDEQUIPMENT_SERIALNUMBER\' | translate}}"></a></th><th>{{ \'ADDEQUIPMENTPAGE_TABLEEQUIPMENTTYPE\' | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{\'TOOLTIP_ADDEQUIPMENT_EQUIPMENTTYPE\' | translate}}"></a></th><th></th></tr><tr><th><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th><input ng-model="name" placeholder="{{ \'ADDEQUIPMENTPAGE_SEARCHNAME\' | translate }}" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="description" placeholder="{{ \'ADDEQUIPMENTPAGE_SEARCHDESCRIPTION\' | translate }}" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="serialNumber" placeholder="{{ \' ADDEQUIPMENTPAGE_SEARCHSERIALNUMBER\' | translate }}" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><input ng-model="equipmentType" placeholder="{{ \'ADDEQUIPMENTPAGE_SEARCHEQUIPMENTTYPE\' | translate }}" class="input-sm form-control search-input" type="search" id="smartTable-search-input"></th><th><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ \'TABLE_SEARCHBUTTON\' | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ \'TABLE_REMOVEFILTERBUTTON\' | translate }}</button></th></tr></thead><tbody><tr ng-repeat="equipment in displayedEquipment" class="editable-row"><td></td><td><span editable-text="equipment.name" e-name="name" e-form="equipmentForm" e-required="">{{ equipment.name || \' -\' }}</span></td><td><span editable-text="equipment.description" e-name="description" e-form="equipmentForm" e-required="">{{ equipment.description || \' -\' }}</span></td><td><span editable-text="equipment.serialNumber" e-name="serialNumber" e-form="equipmentForm" e-required="">{{ equipment.serialNumber || \' -\' }}</span></td><td class="select-td"><span editable-ui-select="equipment.equipmentType" e-form="equipmentForm" data-e-ng-model="equipment.equipmentType" data-e-name="equipmentType" name="equipmentType" data-e-style="min-width:200px;">{{equipment.equipmentType.name}}<editable-ui-select-match>{{$select.selected.name}}</editable-ui-select-match><editable-ui-select-choices repeat="equipmentType in allEquipmentTypes | filter: $select.search track by $index"><span ng-bind-html="equipmentType.name"></span></editable-ui-select-choices></span></td><td><form editable-form="" name="equipmentForm" ng-show="equipmentForm.$visible" class="form-buttons form-inline" shown="inserted == equipment"><button type="submit" ng-click="updateEquipment(equipmentForm,equipment.id)" ng-disabled="equipmentForm.$waiting || equipmentForm.$data.description == \'\' || equipmentForm.$data.name == \'\' || equipmentForm.$data.equipmentType == \'\' || equipmentForm.$data.serialNumber == \'\' || isEquipmentSaved" class="btn btn-primary editable-table-button btn-xs">{{ \'SAVE_BUTTON\' | translate }}</button> <button type="button" ng-disabled="equipmentForm.$waiting" ng-click="equipmentForm.$cancel();removeEmptyRow()" class="btn btn-default editable-table-button btn-xs">{{ \'TABLE_CANCELBUTTON\' | translate }}</button></form><div class="buttons" ng-show="!equipmentForm.$visible"><button class="btn btn-primary editable-table-button btn-xs" ng-click="equipmentForm.$show()">{{ \'TABLE_EDITBUTTON\' | translate }}</button> <button class="btn btn-danger editable-table-button btn-xs" ng-click="removeEquipment(equipmentForm,equipment.id)">{{ \'TABLE_DELETEBUTTON\' | translate }}</button></div></td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getAllEquipment()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div></div>'), e.put("app/pages/task-management/assign-task-and-equipment/defaultSettingFormValuesModal/formModal.html", '<div class="modal-content" style="overflow-y: auto; max-height: 500px;"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><div class="modal-body"><div id="tpl-content" ng-include="\'app/form-page/form-page.html\'"></div></div><div class="modal-footer"><button type="button" set-focus-default="" class="btn btn-primary" ng-click="save()">{{ \'SAVE_BUTTON\' | translate }}</button></div></div>'), e.put("app/pages/task-management/equipment-operations/add-and-edit-equipment-type/add-and-edit-equipment-type.html", '<div ng-controller="addAndEditEquipmentTypeCTRL"><div class="panel"><div class="panel-body"><div class="add-row-editable-table"><button class="btn btn-primary" ng-click="addEquipmentType()">{{ "ADD_BUTTON" | translate }}</button></div><div class="form-group select-page-size-wrap rowsOnPage-select"><label>{{ "TABLE_ROWSONPAGE" | translate }}<select class="form-control show-tick" ng-change="changeRowsOnPage()" ng-model="itemPerPage" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table table-bordered" st-table="displayedEquipmentTypes" st-safe-src="allEquipmentTypes"><thead><tr><th></th><th>{{ "ADDEQUIPMENTPAGE_TABLENAME" | translate }} <a class="ion-information-circled" tooltip-animation="true" tooltip-placement="top" uib-tooltip="{{ \'TOOLTIP_ADDEQUIPMENTGROUP_TABLENAME\' | translate }}"></a></th><th></th></tr><tr><th><a ng-class="isSortUpClicked ? \'ion-arrow-up-c click-sort-up\' : \'ion-arrow-up-c sort-up\'" ng-click="sort(\'ASC\')"></a> <a ng-class="isSortDownClicked ? \'ion-arrow-down-c click-sort-down\' : \'ion-arrow-down-c sort-down\'" ng-click="sort(\'DESC\')"></a></th><th id="table-search-input"><input ng-model="name" style="width:20%;" class="input-sm form-control search-input" type="search" id="smartTable-search-input" placeholder="{{ \'ADDEQUIPMENTPAGE_SEARCHNAME\' | translate }}"></th><th id="smartTable-td"><button class="btn btn-warning editable-table-button btn-xs" ng-click="search()">{{ "TABLE_SEARCHBUTTON" | translate }}</button> <button type="button" class="btn btn-warning btn-xs" ng-click="deleteFilter()">{{ "TABLE_REMOVEFILTERBUTTON" | translate }}</button></th></tr></thead><tbody><tr ng-repeat="equipmentType in displayedEquipmentTypes" class="editable-row"><td></td><td><span editable-text="equipmentType.name" e-name="name" e-form="equipmentTypeForm" e-required="">{{ equipmentType.name || " -" }}</span></td><td id="smartTable-td"><form editable-form="" name="equipmentTypeForm" ng-show="equipmentTypeForm.$visible" class="form-buttons form-inline" shown="inserted == equipmentType"><button type="submit" ng-click="saveEquipmentType(equipmentTypeForm)" ng-disabled="equipmentTypeForm.$waiting || equipmentTypeForm.$data.name == \'\'" class="btn btn-primary editable-table-button btn-xs">{{ "SAVE_BUTTON" | translate }}</button> <button type="button" ng-disabled="equipmentTypeForm.$waiting" ng-click="equipmentForm.$cancel();removeEmptyRow()" class="btn btn-default editable-table-button btn-xs">{{ "TABLE_CANCELBUTTON" | translate }}</button></form><div ng-show="!equipmentTypeForm.$visible"><button class="btn btn-danger editable-table-button btn-xs" ng-click="removeEquipmentType(equipmentType.id)">{{ "TABLE_DELETEBUTTON" | translate }}</button></div></td></tr></tbody></table><div class="table-pagination"><ul uib-pagination="" ng-change="getEquipmentTypes()" items-per-page="itemPerPage" total-items="bigTotalItems" direction-links="false" ng-model="bigCurrentPage" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></ul></div></div></div><div id="preloader" ng-show="isLoading"><div></div></div></div>'), e.put("app/pages/task-management/equipment-operations/add-and-edit-equipment-type/addAndEditEquipmentTypeModal.html", '<div class="modal-content"><div class="modal-header bg-danger"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="linkForm"><div class="modal-body">{{ \'ADDEQUIPMENTTYPEPAGE_WARNINGMESSAGE\' | translate }}</div><div class="modal-footer"><button type="submit" class="btn btn-danger" set-focus-default="" ng-click="$dismiss()">{{ \'TABLE_OKEYBUTTON\' | translate }}</button></div></form></div>'), e.put("app/pages/task-management/equipment-operations/add-and-edit-equipment-type/equipmentExistenceModal.html", '<div class="modal-content"><div class="modal-header bg-danger"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button></div><form name="linkForm"><div class="modal-body"><p>"{{equipmentTypeName}}" {{ \'ADDEQUIPMENTTYPEPAGE_EXISTERROR\' | translate }}</p><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="$dismiss()">Tamam</button></div></div></form></div>')
}]);
//# sourceMappingURL=../maps/scripts/app-eb82942498.js.map