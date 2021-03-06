// APP START
// ****************************
// /www/app/assets/app.js is autogenerated. Do not modify.
// Changes should be made in /master/modules/js or /master/components/<component-name>/js
// ****************************
// -----------------------------------

var app = angular.module('kubernetesApp', [
  'ngRoute',
  'ngMaterial',
  'ngLodash',
  'door3.css',
  'kubernetesApp.config',
  'kubernetesApp.services',
  'angular.filter'
].concat(componentNamespaces));

app.factory('menu', [
  '$location',
  '$rootScope',
  'sections',
  '$route',
  function($location, $rootScope, sections, $route) {

    var self;

    $rootScope.$on('$locationChangeSuccess', onLocationChange);

    return self = {

      sections: sections,

      setSections: function(_sections) { this.sections = _sections; },
      selectSection: function(section) { self.openedSection = section; },
      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function(section) { return self.openedSection === section; },
      selectPage: function(section, page) {
        self.currentSection = section;
        self.currentPage = page;
      },
      isPageSelected: function(page) { return self.currentPage === page; }
    };

    function onLocationChange() {
      var path = $route.current.originalPath;

      var matchPage = function(section, page) {
        if (path === page.url || path === (page.url + '/')) {
          self.selectSection(section);
          self.selectPage(section, page);
        }
      };

      sections.forEach(function(section) {
        if (section.children) {
          section.children.forEach(function(childSection) {
            if (childSection.pages) {
              childSection.pages.forEach(function(page) { matchPage(childSection, page); });
            }
          });
        } else if (section.pages) {
          section.pages.forEach(function(page) { matchPage(section, page); });
        } else if (section.type === 'link') {
          matchPage(section, section);
        }
      });
    }
  }
]);
