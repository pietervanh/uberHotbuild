var hotbuild = new BuildKeysViewModel();
  bif.registerBIFReadyCallback(function () {
  var buildables = bif.getBuildableUnitIDs();
  var uhformat = {};
  for(var i = 0; i < buildables.length; i++)
  {
    var bifunit = bif.units[buildables[i]];
    //uhformat[bifunit.path] = {cost:'',description:bifunit.description,name:bifunit.display_name};
    var hotbuildunit = bifunit;
    hotbuildunit.json = hotbuildunit.path;
    hotbuildunit.displayname = hotbuildunit.display_name;
    hotbuildunit.desc = hotbuildunit.description;
    hotbuildunit.factory = "";
    //console.log(hotbuildunit.json);
    /*jshint -W030 */
    if (_.contains(hotbuildunit.unit_types, 'UNITTYPE_Mobile')) {
        if (_.contains(hotbuildunit.unit_types, 'UNITTYPE_Basic')) {
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Bot') ? hotbuildunit.factory = 'botfac' : '';
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Tank') ? hotbuildunit.factory = 'vecfac' : '';
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Air') ? hotbuildunit.factory = 'afac' : '';
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Naval') ? hotbuildunit.factory = 'nfac' : '';
        }
        else {
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Bot') ? hotbuildunit.factory = 'abotfac' : '';
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Tank') ? hotbuildunit.factory = 'avecfac' : '';
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Air') ? hotbuildunit.factory = 'aafac' : '';
            _.contains(hotbuildunit.unit_types, 'UNITTYPE_Naval') ? hotbuildunit.factory = 'anfac' : '';
        }
        /*jshint +W030 */
        //should change to bif is built by orbital launcher
        //Orbital is changing rapidly so hacky fixes here
        if (hotbuildunit.json === "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json") {
            hotbuildunit.factory = 'ofac';
        }
        if (hotbuildunit.json === "/pa/units/orbital/orbital_lander/orbital_lander.json") {
            hotbuildunit.factory = 'ofac';
        }
        if (hotbuildunit.json === "/pa/units/orbital/orbital_fighter/orbital_fighter.json") {
            hotbuildunit.factory = 'ofac';
        }
        if (hotbuildunit.json === "/pa/units/orbital/radar_satellite/radar_satellite.json") {
            hotbuildunit.factory = 'ofac';
        }
    }

    hotbuildunit.image = hotbuildunit.buildPicture;    
    
    uhformat[bifunit.path] = hotbuildunit;
  }
  hotbuild.unitData(uhformat);
});
hotbuild.restoreDefaults();
