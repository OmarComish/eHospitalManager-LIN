/* utilities javascript file */
//AUTHOR: COMISH OMAR & Fannie Mangame
//DATE CREATED: 13-Feb-2020
//LAST MODIFIED: 13-Feb-2020
class utilities {
    appconfig = new AppConfiguration();
    facilitycollection =[];
    districtcollection =[];
    ownerscollection = [];
    initialisationdata =[];

    notificationMessage(msge, title, state){
      if(state.match(/success/)) toastr.success(msge,title);
      if(state.match(/error/)) toastr.error(msge,title);
      if(state.match(/warning/)) toastr.warning(msge,title);
    }

    NotificationManager=(response,appmodule)=>{
      if(response[0]==='error'){
         document.getElementById('notification-msge').innerHTML = response[1];
         $('#notification-modal').modal('show');
      } else {
         this.notificationMessage(response[0], appmodule, response[1],);
      }
    }

    xmlHttpRequestHandler(url, data, type){
        var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 console.log(JSON.parse(this.responseText));
            }
        }
        xhttp.open(type, url, true);
        xhttp.setRequestHeader("Content-type", "application/jsonp; charset=utf-8");
        type == 'POST' ? xhttp.send(data) : xhttp.send();
    }

    httpXmlRequestMethod(controller,action,type, record){

       if(type.match(/GET/)){
            $.ajax({
                cache: false,
                datatype: "json",
                url: "/" + controller + "/"+ action,
                type: 'GET',
                success: function (data) {
                    //console.log(JSON.stringify(data));
                    requesttype = JSON.stringify(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error, " + errorThrown);
                }
            });
       } else {
            $.ajax({
                cache: false,
                datatype: "json",
                url: "/" + controller+"/"+action,
                type: 'POST',
                data: record,
                success: function (data) {
                    console.log(JSON.stringify(data));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error, " + errorThrown);
                }
            });
       }
    }

    loadCaseTypes(){
      for (let i = 0; i < configuration.caseTypes.length; i ++){
        $('#casecategory').append('<option value ="'+ configuration.caseTypes[i].caseId + '">'+ configuration.caseTypes[i].caseName + '</option>');
      }
    }
    
    loadContent(id){
        if(id==='dashboard'){
            document.getElementById('main-app-content').innerHTML = view.dashboard[0];
            document.getElementById('topHeader').innerHTML = "DASHBOARD";
        }
        if(id==='caselisting'){
            if(document.getElementById('casecategory').length == 1)this.loadCaseTypes();
            document.getElementById('topHeader').innerHTML = "Case Listing";
            $('#datefiltermodal').modal('show');
        }
        
        if(id==='newfacility'){
            document.getElementById('main-app-content').innerHTML = view.wallets[0];
            document.getElementById('topHeader').innerHTML = "New Facility";
            document.getElementById('moduletitle').innerHTML = "New Facility";

            this.fillselectlist();
            $('#newfacility_modal').modal('show');
             //PopulateListControls();
            //PopulateSystemListControls();
            //PopulateUserTypeListControls();
            //PopulateBranchListControls();
            //PopulateDepartmentListControls();
           // PopulateEmployeeDetailsListControls();
            //PopulatesubmissionModeListControls();
            //PositionListControls();
            //initDatatable();
            //loadDateFilterModal();
            //filterFunction();
        }
        if(id==='settings'){
          document.querySelector('.floating-btn').style.display ='block';
          document.getElementById('main-app-content').innerHTML = view.settings[0];
          document.getElementById('topHeader').innerHTML = "Settings";
          this.appconfig.loadUserProfiles();
        }
    }

    loadModalWindow(id){
      let vwcontents='<div class="table-responsive">';
          vwcontents +='<table class="table border" style="width: 800px;"><tr><td>Request type:  </td><td class="right">'+ pendingapprovalrequests['res'][0].description + '</td></tr>';
          vwcontents +='<tr><td> Requested by:  </td><td class="right">'+ pendingapprovalrequests['res'][0].employee + '</td></tr>';
          vwcontents +='<tr><td> Requested date:  </td><td class="right">'+ pendingapprovalrequests['res'][0].dateApplied + '</td></tr>';
          vwcontents +='<tr><td> Profile expiry date:  </td><td class="right">'+ pendingapprovalrequests['res'][0].profileExpiryDate + '</td></tr>';
          if(pendingapprovalrequests['res'][0].systemName.length != 0){
            vwcontents +='<tr><td> Requested system(s):  </td><td class="right">'+ pendingapprovalrequests['res'][0].systemName.length +'</td></tr>';
            for(let i = 0; i < pendingapprovalrequests['res'][0].systemName.length; i ++){
              vwcontents +='<tr><td></td><td class="right">'+ pendingapprovalrequests['res'][0].systemName[i].applicationName + '</td></tr>';
            } 
          }
          if(pendingapprovalrequests['res'][0].uploadedFiles.length != 0){
            vwcontents +='<tr><td> Attachment(s):  </td><td class="right">'+ pendingapprovalrequests['res'][0].uploadedFiles.length +'</td></tr>';
            for(let y = 0; y < pendingapprovalrequests['res'][0].uploadedFiles.length; y++){
              vwcontents +='<tr><td></td><td class="right">'+ pendingapprovalrequests['res'][0].uploadedFiles[y].name + '</td></tr>';
            }
          }
          vwcontents +='</table></div>';
         document.getElementById('viewrequestdetails').innerHTML = vwcontents;
      $('#ViewDetails').modal('show');

    }

    initDatatable(casetype, startdate, enddate) {
            grid = $("#cases_tbl").DataTable({
                "ajax": {
                    "url": "/DocumentFlow/GetFeedBackForm/",
                    "contentType": "application/x-www-form-urlencoded",
                    "type": "POST",
                    "data":{casename: casetype,startdate: startdate, enddate: enddate, branchid: sessionStorage.getItem("branchid")},
                    "dataType": "json",
                    "dataSrc": function (data) {

                      for(let i = 0; i < data['res'].length; i ++){
                        data['res'][i].complaintDate = utils.SanitiseDate(data['res'][i].complaintDate);
                        data['res'][i].resolutionDate = utils.SanitiseDate(data['res'][i].resolutionDate);
                        data['res'][i].resolutionAccepted =  data['res'][i].resolutionAccepted==1? 'YES': 'NO';
                        data['res'][i].finESFunded=  data['res'][i].finESFunded==1? 'YES': 'NO';
                      }
                      return data['res'];
                    }
                },
                "dom": 'Bfrtip',
                 "buttons" :[ 'copy', 'csv', 'excel', 'pdf', 'print'],
                  "columns": [
                    { data: "feedBackFormID" },
                    { data: "complaintDate" },
                    { data: "complaintDetails" },  
                    { data: "gender"},
                    { data: "age" },
                    { data: "submissionMode" },
                    { data: "branch" },
                    { data: "complaintNature" },  
                    { data: "resolution" },
                    { data: "responsiblePerson"},
                    { data: "resolutionDate" },
                    { data: "resolutionAccepted" },
                    { data: "comments"} 
                  ],
          "serverSide": "true",
          "order":[0, "asc"],
          "processing":"true",
          "language":{
              "processing":"<span style='color: red; font-weight: bold;'>processing... please wait</span>"
          }
      });
    }
    
    initCaseDataTable(startdate, enddate){
        casesgrid = $("#cases_tbl").DataTable({
                  "ajax": {
                      "url": "/DocumentFlow/GetFeedBackForm/",
                      "contentType": "application/x-www-form-urlencoded",
                      "type": "POST",
                      "data":{startdate: startdate, enddate: enddate, branchid: sessionStorage.getItem("branchid")},
                      "dataType": "json",
                      "dataSrc": function (data) {

                        for(let i = 0; i < data['res'].length; i ++){
                          data['res'][i].complaintDate = utils.SanitiseDate(data['res'][i].complaintDate);
                          data['res'][i].resolutionDate = utils.SanitiseDate(data['res'][i].resolutionDate);
                          data['res'][i].resolutionAccepted =  data['res'][i].resolutionAccepted==1? 'YES': 'NO';
                          data['res'][i].finESFunded=  data['res'][i].finESFunded==1? 'YES': 'NO';
                        }
                        return data['res'];
                      }
                  },
                  "dom": 'Bfrtip',
                  "buttons" :[ 'copy', 'csv', 'excel', 'pdf', 'print'],
                    "columns": [
                        { data: "feedBackFormID" },
                        { data: "complaintDate" },
                        { data: "complaintDetails" },
                        { data: "submissionMode" },
                        { data: "branch" },
                        { data: "complaintNature" },
                        { data: "responsiblePerson"},
                        { data: "resolution" },
                        { data: "resolutionAccepted" },
                        { data: "resolutionDate" },
                        { data: "age"},
                        { data: "gender" },
                        { data: "finESFunded"},
                        { data: "comments"} 
                    ],
            "serverSide": "true",
            "order":[0, "asc"],
            "processing":"true",
            "language":{
                "processing":"processing... please wait"
            }
          });
    }

    SanitiseDate(dateobject){
      if(dateobject!= null) return moment(dateobject).format('YYYY-MM-DD hh:mm:ss');
    }

    loadDateFilterModal(){
      $('#datefiltermodal').modal('show');
    }

    GenerateHtmlTable(){

      table.className = "display";
      table.setAttribute('id','request_view_details');
      cols = ["Request type", "Requested by", "Date requested", "Profile expiry date", "Requested apps","Attachments"];
      let columnCount = cols.length;
  
      //Add the header row.
      let row = table.insertRow(-1);
      row.className = "active";
      for (let i = 0; i < columnCount; i++) {
          let headerCell = document.createElement("TH");
          headerCell.innerHTML = cols[i];
          row.appendChild(headerCell);
      }
      let dvTable = document.getElementById('userprivs_edit');
      dvTable.innerHTML = "";
      dvTable.appendChild(table);
    }

    initialiseDataTable(category, startdate, enddate){
        document.getElementById('main-app-content').innerHTML = view.AdminApprove[0];
        document.getElementById('topHeader').innerHTML = "Case listing";
        document.getElementById('moduletitle').innerHTML ='Category:' + category;
       if(!category.match(/Complaint/)){
          document.getElementById('spot-1').innerHTML = 'Case date';
          document.getElementById('spot-2').innerHTML = 'Case details';
          document.getElementById('spot-3').innerHTML = 'Detail/Nature of Case';
        }
       this.initDatatable(category,startdate, enddate);
    }

    sendHttpRequest = (method, url, data) => {
      const promise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.responseType = 'json';
          if (data) {
              xhr.setRequestHeader('Content-Type', 'application/json');
          }
          xhr.onload = () => {
              if (xhr.status >= 400) {
                  reject(xhr.response);
              } else {
                  resolve(xhr.response);
              }
          };
          xhr.onerror = () => {
              reject('Something went wrong', error);
          };
          xhr.send(JSON.stringify(data));
      });
      return promise;
    }

    loadNavigation(usertype){
      let menuitem ='';
      if(usertype == 1){
        menuitem +='<li class="nav-item active">';
        menuitem +='<a class="nav-link" id="dashboard" href="#dashboard" onclick="loadView(this.id);">';
        menuitem +='<i class="material-icons" id="dashboard">dashboard</i>';
        menuitem +='<p id="dash">Dashboard</p></a></li>';

        menuitem +='<li class="nav-item">';
        menuitem +='<a class="nav-link" id="newfacility" href="#" onclick="loadView(this.id)">';
        menuitem +='<i class="material-icons">post_add</i><p>New Facility</p></a></li>';

        menuitem +='<li class="nav-item ">';
        menuitem +='<a class="nav-link" id="caselisting" href="#" onclick="loadView(this.id)">';
        menuitem +='<i class="material-icons">search</i><p>Facility listing</p></a></li>';
  
        menuitem +='<li class="nav-item ">';
        menuitem +='<a class="nav-link" id="settings" href="#" onclick="loadView(this.id)">';
        menuitem +='<i class="material-icons">settings</i><p>Settings</p></a></li>';

      } else {
        menuitem +='<li class="nav-item active">';
        menuitem +='<a class="nav-link" id="newcase" href="#" onclick="loadView(this.id)">';
        menuitem +='<i class="material-icons">post_add</i><p>New Facility</p></a></li>';
  
        menuitem +='<li class="nav-item ">';
        menuitem +='<a class="nav-link" id="caselisting" href="#" onclick="loadView(this.id)">';
        menuitem +='<i class="material-icons">search</i><p>Facility Listings</p></a></li>';
      }
      document.getElementById('navigation-items').innerHTML = menuitem;
    }

    clearInput=(object)=>{
      for (const [key, value] of Object.entries(object)) {
        document.getElementById(value).value = '';
      }
    }

    fetchDistrictData=()=>{
      this.sendHttpRequest
      utils.sendHttpRequest('GET','https://zipatala.health.gov.mw/api/districts',{}).then(response=>{
        if(Object.keys(response).length != 0){
            this.districtcollection = response;
        }
      }).catch(error=>console.log(error))
    }

    fetchOwnerData=()=>{
      this.sendHttpRequest
      utils.sendHttpRequest('GET','https://zipatala.health.gov.mw/api/owners',{}).then(response=>{
        if(Object.keys(response).length != 0){
            this.ownerscollection = response;
        }
      }).catch(error=>console.log(error))
    }

    fetchFacilityData=()=>{
         this.sendHttpRequest
         utils.sendHttpRequest('GET','https://zipatala.health.gov.mw/api/facilities',{}).then(response=>{
           if(Object.keys(response).length != 0){
               this.facilitycollection = response;
           }
         }).catch(error=>console.log(error))
    }

    addDistrict=()=>{
      let url = '/Home/AddDistrict';
        for(let d  = 0; d < this.districtcollection.length; d ++){
          var record = {
                    DistrictName: this.districtcollection[d].district_name,
                    DistrictCode: this.districtcollection[d].district_code,
                    Zone: this.districtcollection.zone_id
          };
          this.sendHttpRequest('POST',url, record).then(response=>{
            console.log(response);
          }).catch(error=>console.log(error));
        }
    }
    addOwner=()=>{
      let url = '/Home/AddOwner';
        for(let d  = 0; d < this.ownerscollection.length; d ++){
          var record = {
                    FacilityOwner: this.ownerscollection[d].facility_owner,
                    Description: this.ownerscollection[d].description
          };
          this.sendHttpRequest('POST',url, record).then(response=>{
            console.log(response);
          }).catch(error=>console.log(error));
        }
    }

    addFacility=()=>{

        let url = '/Home/AddFacility';
          var record = {FacilityCode: document.getElementById('facility_code').value,
                        FacilityName: document.getElementById('facility_name').value,
                        DistrictId: parseInt(document.getElementById('district').value),
                        OwnerId: parseInt(document.getElementById('facilityowner').value)};

                this.sendHttpRequest('POST',url, record).then(response=>{
                  console.log(response);
                }).catch(error=>console.log(error));
          
    }

    fillselectlist=()=>{

      this.initialisationdata.vmDistricts.forEach(element => {
          $('#district').append('<option value ="'+ element.districCode + '">'+ element.districtName + '</option>');
      });
      this.initialisationdata.drawperiodicity.forEach(element => {
          $('#facilityowner').append('<option value ="'+ element.id + '">'+ element.facility + '</option>');
      });
    }

    fetchInitData=()=>{
      utils.sendHttpRequest('GET','/Home/InitialisationData',{}).then(response=>{
         if(Object.keys(response).length != 0){
          this.initialisationdata = response;
         }
      }).catch(error=>console.log(error))
    }
}

function ClearInputFields(){
  document.getElementById('dateApplied').value = '';
  document.getElementById('ComplaintDetails').value = '';
  document.getElementById("submissionMode").value = '',
  document.getElementById("Branch").value ='',
  document.getElementById("ComplaintNature").value = '',
  document.getElementById("Resolution").value ='',
  document.getElementById("ResolutionDate").value = '',
  document.getElementById("Comments").value = '';
}

function submitform(){

      let complaintrecord = {
                         ComplaintDate:    document.getElementById('complaintdate').value,
                         IssueType: parseInt(document.getElementById('issuetype').value),
                         CaseType: parseInt(document.getElementById('casetype').value),
                         CustomerName: document.getElementById('customername').value,
                         ContactNumber: document.getElementById('contactnumber').value,
                         AccountNumber: document.getElementById('accountnumber').value,
                         ComplaintNature: document.getElementById('complaintnature').value,
                         SubmissionMode: parseInt(document.getElementById('submissionmode').value),
                         Branch: parseInt(document.getElementById('branch').value),
                         Escalation: parseInt(document.getElementById('escalation').value),
                         Resolution: document.getElementById('resolution').value,
                         ResolutionDate: document.getElementById('resolutiondate').value,
                         Status: parseInt(document.getElementById('status').value),
                         Remarks: document.getElementById('remarks').value,
                         DateofBirth: document.getElementById('dateofbirth').value,
                         ResolutionAccepted: (document.getElementById('resolutionaccepted').value === '1'? 1: 0),
                         ResponsiblePerson: document.getElementById('personresponsible').value,
                         FinESFunded: (document.getElementById('finesfunded').value==='1'? 1: 0)
                      };

     /* console.log(complaintrecord);*/
    
    if(complaintrecord != null){
        $.ajax({
            cache: false,
            datatype: "json",
            url: "/DocumentFlow/SubmitFeedBackForm",
            type: 'POST',
            data: complaintrecord,
            success: function (data) {
               utils.notificationMessage(data[1],'Submit Complaint',data[0]);
               //ClearInputFields();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error, " + errorThrown);
            }
      });
    } 
}

function fillselectlist(){
    for (let i = 0; i < configuration.issueTypes.length; i ++){
       $('#issuetype').append('<option value ="'+ configuration.issueTypes[i].issueId + '">'+ configuration.issueTypes[i].issueName + '</option>');
    }
}

function systemselectlist(){
    for (let i = 0; i<requesttype.systemAppList.length; i++){
        $('#system').append('<option value ="'+ requesttype.systemAppList[i].systemID + '">'+ requesttype.systemAppList[i].systemName + '</option>');
    }
}

function usertypeselectlist(){
    for (let i = 0; i<requesttype.userTypeList.length; i++){
        $('#userType').append('<option value ="'+ requesttype.userTypeList[i].UserTypeID + '">'+ requesttype.userTypeList[i].userTypeName + '</option>');
    }
}

function submissionModeList() {
    for (let i = 0; i < requesttype.submissionModeList.length; i++) {
        $('#SubmissionMode').append('<option value ="' + requesttype.submissionModeList[i].submissionModeID + '">' + requesttype.submissionModeList[i].modeName + '</option>');
    }
}

async function postData(url = '', systemaccessform = {}) {
  const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(systemaccessform)
  });

  return response.json();
}

function branchselectlist(){

    for (let i = 0; i<configuration.branchList.length; i++){
        $('#branch').append('<option value ="'+ configuration.branchList[i].branchID + '">'+ configuration.branchList[i].branchName + '</option>');
    }
    for (let i = 0; i < configuration.issueTypes.length; i ++){
      $('#issuetype').append('<option value ="'+ configuration.issueTypes[i].issueId + '">'+ configuration.issueTypes[i].issueName + '</option>');
    }
    for (let i = 0; i < configuration.caseTypes.length; i ++){
          $('#casetype').append('<option value ="'+ configuration.caseTypes[i].caseId + '">'+ configuration.caseTypes[i].caseName + '</option>');
    }
    //for (let i = 0; i < configuration.caseTypes.length; i ++){
      //$('#casecategory').append('<option value ="'+ configuration.caseTypes[i].caseId + '">'+ configuration.caseTypes[i].caseName + '</option>');
    //}
    for (let i = 0; i < configuration.submissionModeList.length; i ++){
      $('#submissionmode').append('<option value ="'+ configuration.submissionModeList[i].submissionModeID + '">'+ configuration.submissionModeList[i].modeName + '</option>');
    }
    for (let i = 0; i < configuration.escalationPoint.length; i ++){
      $('#escalation').append('<option value ="'+ configuration.escalationPoint[i].id + '">'+ configuration.escalationPoint[i].name + '</option>');
    }
    for (let i = 0; i < configuration.issueStatuses.length; i ++){
      $('#status').append('<option value ="'+ configuration.issueStatuses[i].statusId + '">'+ configuration.issueStatuses[i].statusName + '</option>');
    }
}

function departmentselectlist(){
    for (let i = 0; i<requesttype.departmentList.length; i++){
        $('#department').append('<option value ="'+ requesttype.departmentList[i].DepartmentID + '">'+ requesttype.departmentList[i].departmentName + '</option>');
    }
}

function employeedetailsselectlist(){
    for (let i = 0; i<requesttype.employeeDetailsList.length; i++){
        $('#employeeName').append('<option value ="'+ requesttype.employeeDetailsList[i].employeeID + '">'+ requesttype.employeeDetailsList[i].employeeName + '</option>');
    }
}

function positionselectlist(){
    for (let i = 0; i<requesttype.designationList.length; i++){
        $('#position').append('<option value ="'+ requesttype.designationList[i].designationId + '">'+ requesttype.designationList[i].description + '</option>');
    }
}

const elementvalidator =((id)=>{
  if(id.match(/first_name/) || id.match(/last_name/) || id.match(/username/)){
    let errorlabel = 'error-label-' + id;
    document.getElementById(id).style.borderColor = "red";
    let el = document.getElementById(id);
    if(el.dataset.kvaluetype.match(/text/) && el.value.trim().length != 0){
       let regex = "^[a-zA-Z ]*$";
       if(el.value.match(regex)){
          if(id.match(/first_name/)) document.getElementById('last_name').removeAttribute('disabled');
          if(id.match(/last_name/)) document.getElementById('department').removeAttribute('disabled');
          if(id.match(/user_name/)) document.getElementById('mobile').removeAttribute('disabled');  
          document.getElementById(errorlabel).innerHTML ='';
          return;
       } else {
          document.getElementById(errorlabel).innerHTML = 'Invalid input. Please enter text only';
       }
       document.getElementById(errorlabel).style.color ="red";
    }
    if(el.value.trim().length == 0 && el.required){
      document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
      document.getElementById(errorlabel).style.color ="red";
      return;
    }  
  }
  if(id.match(/mobile/)){
    let errorlabel = 'error-label-' + id;
    document.getElementById(id).style.borderColor = "red";
    let el = document.getElementById(id);
    if(el.dataset.kvaluetype.match(/text/) && el.value.trim().length != 0){
      let regex = "^[0]{1}[0-9]{9}$";
      if(el.value.match(regex)){
          let textvalue = document.getElementById('designation').selectedOptions[0].firstChild.data;
          if(textvalue.match(/System Owner/) || textvalue.match(/Executor/)){
            document.getElementById('businessapps').removeAttribute('disabled');
          } else {
            document.getElementById('email').removeAttribute('disabled');
          }
          document.getElementById(errorlabel).innerHTML ='';
          return;
      } else {
          document.getElementById(errorlabel).innerHTML = 'Invalid input. Please enter correct number';
      }
      document.getElementById(errorlabel).style.color ="red";
    }
    if(el.value.trim().length == 0 && el.required){
      document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
      document.getElementById(errorlabel).style.color ="red";
      return;
    } 
  } 
  if(id.match(/email/)){
    let errorlabel = 'error-label-' + id;
    document.getElementById(id).style.borderColor = "red";
    let el = document.getElementById(id);
    if(el.value.trim().length != 0){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.value)){
          document.getElementById(errorlabel).innerHTML = '';
          document.getElementById('user_role').removeAttribute('disabled');
          return;
        } else {
          document.getElementById(errorlabel).innerHTML = 'Invalid input. Please enter correct email address';
        }
        document.getElementById(errorlabel).style.color ="red";
    }
    if(el.value.trim().length == 0 && el.required){
      document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
      document.getElementById(errorlabel).style.color ="red";
      return;
    } 
  }
  if(id.match(/password1/) || id.match(/password2/)){
    let errorlabel = 'error-label-' + id;
    document.getElementById(id).style.borderColor = "red";
    let el = document.getElementById(id);
    if(id === "password2"){
      if(document.getElementById('password1').value != document.getElementById('password2').value){
        document.getElementById(errorlabel).innerHTML = 'Passwords not matching!';
        document.getElementById(errorlabel).style.color ="red";
        return;
      } else {
        //enable the submit button
      }
    }
    if(el.value.trim().length != 0){
      if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(el.value)){
          document.getElementById(errorlabel).innerHTML = '';
          if(id === 'password1') document.getElementById('password2').removeAttribute('disabled');
          if(id === 'password2') document.getElementById('adduserbtn').removeAttribute('disabled');
          return;
      } else {
        document.getElementById(errorlabel).innerHTML = 'Invalid input. Please enter correct password';
      }
      document.getElementById(errorlabel).style.color ="red";
    }
    if(el.value.trim().length == 0 && el.required){
      document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
      document.getElementById(errorlabel).style.color ="red";
      return;
    }
  }
});

const initialiser = (function(){
  configuration = [];
         loadconfiguration=()=>{
          return utils.sendHttpRequest('GET','/Configuration/GetApplicationInitialization',{}).then(response=>configuration=response);
         }
         return {
          retriveconfig: ()=>{
          loadconfiguration();
          let dikira= setTimeout(()=>{
            if(configuration != null){
              console.log('loading configs...')
              if(configuration.chartConfig.autoSlide){
                 slideinterval = configuration.chartConfig.slideInterval;
              } 
              sentinel = true;
              clearTimeout(dikira);
              } 
            },2000);
             dikira;
            },
          recapture: ()=>{return configuration;}
          }
 })();


function PopulateListControls(){
      let dikira= setTimeout(()=>{
        if(document.getElementById('request') != undefined){
          fillselectlist();
          clearTimeout(dikira);
          } 
        },2000);
          dikira;          
}

function PopulatesubmissionModeListControls() {

    let dikira = setTimeout(() => {
        if (document.getElementById('SubmissionMode') != undefined) {
            submissionModeList();
            clearTimeout(dikira);
        }
    }, 2000);
    dikira;
}

function PopulateSystemListControls() {
    
    let dikira= setTimeout(()=>{
      if(document.getElementById('system') != undefined){
        systemselectlist();
        clearTimeout(dikira);
        } 
      },2000);
        dikira; 
}

function PopulateUserTypeListControls(){
           
    let dikira= setTimeout(()=>{
        
      if(document.getElementById('userType') != undefined){
        usertypeselectlist();
        
        clearTimeout(dikira);
        } 
      },2000);
        dikira;          
}

function PopulateBranchListControls(){
      
      let dikira= setTimeout(()=>{
          
        if(document.getElementById('branch') != undefined){
          branchselectlist();
          
          clearTimeout(dikira);
          } 
        },2000);
          dikira;   
}

function PopulateDepartmentListControls(){
      
      let dikira= setTimeout(()=>{
          
        if(document.getElementById('department') != undefined){
          departmentselectlist();
          
          clearTimeout(dikira);
          } 
        },2000);
          dikira;  
}

function PopulateEmployeeDetailsListControls(){
      
      let dikira= setTimeout(()=>{
          
        if(document.getElementById('employeeName') != undefined){
          employeedetailsselectlist();
          clearTimeout(dikira);
          } 
        },2000);
          dikira;  
}

function PositionListControls(){
      
      let dikira= setTimeout(()=>{
          
        if(document.getElementById('position') != undefined){
          positionselectlist();
          clearTimeout(dikira);
          } 
        },2000);
          dikira; 
}

function DataTableLoad(){
      
      let waitingloading= setTimeout(()=>{
          
        if(document.getElementById('position') != undefined){
          initDatatable('2020-06-20','2020-06-28');
          clearTimeout(waitingloading);
          } 
        },2000);
          waitingloading;   
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("employeeName");
    filter = input.value.toUpperCase();
    div = document.getElementById("employeeid");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
}

class DashBoardCharts {
     yearlystatisticsdata =[];
     quartelystatistics =[];
     monthlystatistics =[];
     ReDrawChart(year){
         sessionStorage.setItem('reportingyear', year.options[year.selectedIndex].value);
         //Highcharts.chart('chart-container').redraw();
         this.ReDrawOnCanvas('chart-container',20);
         //this.ReDrawOnCanvas('container-p5',20);
        // this.ReDrawOnCanvas('container-p2',20);
        // this.ReDrawOnCanvas('container-p3',25);
        //this.ReDrawOnCanvas('container-p4',10);
         //this.ReDrawOnCanvas('container-p6',10);
     }

     ReDrawOnCanvas(chartid, yAxis){
        let chartobject = $('#'+ chartid).highcharts();
        //chartobject.yAxis[0].min = 0;
        //chartobject.yAxis[0].max = yAxis;
        //chartobject.yAxis[0].tickInterval = 1;
        chartobject.yAxis[0].isDirty = true;
        chartobject.redraw();
     }

     drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Forms', 'Complaints made the past four this month'],
            ['April', this.monthlystatistics.april.complaints],
            ['March', this.monthlystatistics.march.complaints],
            ['February', this.monthlystatistics.february.complaints],
            ['January', this.monthlystatistics.january.complaints]
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = { 'title': 'COMPLAINTS', 'width': 700, 'height': 400 };

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
     }

     DrawPlainChart(){

        var chart = Highcharts.chart('container-p5', {

          title: {
            text: 'TOP COMPLAINTS ' + sessionStorage.getItem('reportingyear')
          },
        
          subtitle: {
            text: 'Plain'
          },
        
          xAxis: {
            categories: ['ATM Issues', 'EazyMobile', 'EMV Card', 'Loans', 'Cardless','Interbank Transfers',
                        'Bank to Wallet', 'Escom Token','GoTV','DsTV','Other']
          },
        
          series: [{
            type: 'column',
            colorByPoint: true,
            data: [topcomplaints.atmIssues,topcomplaints.eazyMobile,
                   topcomplaints.emvCard,topcomplaints.loan,topcomplaints.cardless,
                   topcomplaints.interbankTransfers,topcomplaints.bankToWallet,topcomplaints.escomToken,
                   topcomplaints.gotv,topcomplaints.dstv,topcomplaints.other],
            showInLegend: false
          }]
        
        });
        
        
        $('#plain').click(function () {
          chart.update({
            chart: {
              inverted: false,
              polar: false
            },
            subtitle: {
              text: 'Plain'
            }
          });
        });
        
        $('#inverted').click(function () {
          chart.update({
            chart: {
              inverted: true,
              polar: false
            },
            subtitle: {
              text: 'Inverted'
            }
          });
        });
        
        $('#polar').click(function () {
          chart.update({
            chart: {
              inverted: false,
              polar: true
            },
            subtitle: {
              text: 'Polar'
            }
          });
        });
      
     }

     DrawCombinationChart(year){
         Highcharts.chart('chart-container', {
            title: {
                text: year == null? sessionStorage.getItem('reportingyear') : year.options[year.selectedIndex].value
            },
            xAxis: {
                categories: ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter']
            },
            labels: {
                items: [{
                html: 'Total Feedback',
                style: {
                    left: '50px',
                    top: '18px',
                    color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                    ) || 'black'
                }
                }]
            },
            series: [{
                type: 'column',
                name: 'Requests',
                data: [/*quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 1)[0].total*/0, 
                       quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 2)[0].total,
                       quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 3)[0].total,
                       quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 4)[0].total
                      ]
            }, {
                type: 'column',
                name: 'Inquiries',
                data: [2, 3, 5, 7]
            }, {
                type: 'column',
                name: 'Complements',
                data: [4, 3, 3, 9]
            }, 
               {
                 type: 'column',
                 name: 'Complaints',
                 data: [3, 1, 2, 3]
               },
            
               {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33],
                marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
                }
            }/*, {
                type: 'pie',
                name: 'Total',
                data: [{
                name: 'Requests',
                y: 13,
                color: Highcharts.getOptions().colors[0] 
                }, {
                name: 'Inquiries',
                y: 23,
                color: Highcharts.getOptions().colors[1] 
                }, {
                name: 'Complements',
                y: 19,
                color: Highcharts.getOptions().colors[2] 
                },
                {
                  name: 'Complaints', 
                  y: 10, 
                  color: Highcharts.getOptions().colors[3] //Complaints
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                enabled: false
                }
            }*/]
        });
     }

     DrawDrillDownChart(year){
       // Create the chart
           globalchart= Highcharts.chart('container-p2', {
              chart: {
                type: 'column'
              },
              title: {
                text: 'TOP REQUESTS  ' + year 
              },
              subtitle: {
                text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">nbs.com</a>'
              },
              accessibility: {
                announceNewData: {
                  enabled: true
                }
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Total Requests'
                }

              },
              legend: {
                enabled: false
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                  }
                }
              },

              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
              },

              series: [
                {
                  name: "Requests",
                  colorByPoint: true,
                  data: [
                    {
                      name: "ATM Issues",
                      y: requeststats.atmIssues,
                      drilldown: "ATM Issues"
                    },
                    {
                      name: "Eazy Mobile",
                      y: requeststats.eazyMobile,
                      drilldown: "Eazy Mobile"
                    },
                    {
                      name: "EMV Card Issues",
                      y: requeststats.emvCard,
                      drilldown: "EMV Card Issues"
                    },
                    {
                      name: "GOTV",
                      y: requeststats.gotv,
                      drilldown: "GOTV"
                    },
                    {
                      name: "DSTV",
                      y: requeststats.dstv,
                      drilldown: "DSTV"
                    },
                    {
                      name: "Loans",
                      y: requeststats.loan,
                      drilldown: "Loans"
                    },
                    {
                      name: "Bank to Wallet",
                      y: requeststats.bankToWallet,
                      drilldown: "Bank to Wallet"
                    },
                    {
                      name: "Cardless",
                      y: requeststats.cardless,
                      drilldown: "Cardless"
                    },
                    {
                      name: "Interbank Transfers",
                      y: requeststats.interbankTransfers,
                      drilldown: "Interbank Transfers"
                    },
                    {
                      name: "Escom Token",
                      y: requeststats.escomToken,
                      drilldown: "Escom Token"
                    },
                    {
                      name: "Other",
                      y: requeststats.other,
                      drilldown: "Other"
                    }
                  ]
                }
              ],
              drilldown: {
                series: [
                  {
                    name: "ATM Issues",
                    id: "atm",
                    data: [
                      [
                        "v65.0",
                        0.1
                      ],
                      [
                        "v64.0",
                        1.3
                      ],
                      [
                        "v63.0",
                        53.02
                      ],
                      [
                        "v62.0",
                        1.4
                      ],
                      [
                        "v61.0",
                        0.88
                      ],
                      [
                        "v60.0",
                        0.56
                      ],
                      [
                        "v59.0",
                        0.45
                      ],
                      [
                        "v58.0",
                        0.49
                      ],
                      [
                        "v57.0",
                        0.32
                      ],
                      [
                        "v56.0",
                        0.29
                      ],
                      [
                        "v55.0",
                        0.79
                      ],
                      [
                        "v54.0",
                        0.18
                      ],
                      [
                        "v51.0",
                        0.13
                      ],
                      [
                        "v49.0",
                        2.16
                      ],
                      [
                        "v48.0",
                        0.13
                      ],
                      [
                        "v47.0",
                        0.11
                      ],
                      [
                        "v43.0",
                        0.17
                      ],
                      [
                        "v29.0",
                        0.26
                      ]
                    ]
                  },
                  {
                    name: "Eazy Mobile",
                    id: "EazyMobile",
                    data: [
                      [
                        "v58.0",
                        1.02
                      ],
                      [
                        "v57.0",
                        7.36
                      ],
                      [
                        "v56.0",
                        0.35
                      ],
                      [
                        "v55.0",
                        0.11
                      ],
                      [
                        "v54.0",
                        0.1
                      ],
                      [
                        "v52.0",
                        0.95
                      ],
                      [
                        "v51.0",
                        0.15
                      ],
                      [
                        "v50.0",
                        0.1
                      ],
                      [
                        "v48.0",
                        0.31
                      ],
                      [
                        "v47.0",
                        0.12
                      ]
                    ]
                  },
                  {
                    name: "EMV Card Issues",
                    id: "EMVCardIssues",
                    data: [
                      [
                        "v11.0",
                        6.2
                      ],
                      [
                        "v10.0",
                        0.29
                      ],
                      [
                        "v9.0",
                        0.27
                      ],
                      [
                        "v8.0",
                        0.47
                      ]
                    ]
                  },
                  {
                    name: "Fees & Commission",
                    id: "Fees",
                    data: [
                      [
                        "v11.0",
                        3.39
                      ],
                      [
                        "v10.1",
                        0.96
                      ],
                      [
                        "v10.0",
                        0.36
                      ],
                      [
                        "v9.1",
                        0.54
                      ],
                      [
                        "v9.0",
                        0.13
                      ],
                      [
                        "v5.1",
                        0.2
                      ]
                    ]
                  },
                  {
                    name: "Loans",
                    id: "Loans",
                    data: [
                      [
                        "v16",
                        2.6
                      ],
                      [
                        "v15",
                        0.92
                      ],
                      [
                        "v14",
                        0.4
                      ],
                      [
                        "v13",
                        0.1
                      ]
                    ]
                  },
                  {
                    name: "Eazy Wallet",
                    id: "EazyWalet",
                    data: [
                      [
                        "v50.0",
                        0.96
                      ],
                      [
                        "v49.0",
                        0.82
                      ],
                      [
                        "v12.1",
                        0.14
                      ]
                    ]
                  }
                ]
              }
            });
     }

     DrawRotatedLabelsChart(){
      Highcharts.chart('container-p3', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'TOP QUERIES ' + sessionStorage.getItem('reportingyear')
        },
        subtitle: {
          text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">nbs.com</a>'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Queries'
          }

        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}'
            }
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
          {
            name: "Queries",
            colorByPoint: true,
            data:[
              {
                name: "ATM Issues",
                y: querystats.atmIssues,
                drilldown: "ATM Issues"
              },
              {
                name: "Eazy Mobile",
                y: querystats.eazyMobile,
                drilldown: "Eazy Mobile"
              },
              {
                name: "EMV Card Issues",
                y: querystats.emvCard,
                drilldown: "EMV Card Issues"
              },
              {
                name: "GOTV",
                y: querystats.gotv,
                drilldown: "GOTV"
              },
              {
                name: "DSTV",
                y: querystats.dstv,
                drilldown: "DSTV"
              },
              {
                name: "Loans",
                y: querystats.loan,
                drilldown: "Loans"
              },
              {
                name: "Bank to Wallet",
                y: querystats.bankToWallet,
                drilldown: "Bank to Wallet"
              },
              {
                name: "Cardless",
                y: querystats.cardless,
                drilldown: "Cardless"
              },
              {
                name: "Interbank Transfers",
                y: querystats.interbankTransfers,
                drilldown: "Interbank Transfers"
              },
              {
                name: "Escom Token",
                y: querystats.escomToken,
                drilldown: "Escom Token"
              },
              {
                name: "Other",
                y: querystats.other,
                drilldown: "Other"
              }
            ]
          }
        ],
        drilldown: {
          series: [
            {
              name: "ATM Issues",
              id: "atm",
              data: [
                [
                  "v65.0",
                  0.1
                ],
                [
                  "v64.0",
                  1.3
                ],
                [
                  "v63.0",
                  53.02
                ],
                [
                  "v62.0",
                  1.4
                ],
                [
                  "v61.0",
                  0.88
                ],
                [
                  "v60.0",
                  0.56
                ],
                [
                  "v59.0",
                  0.45
                ],
                [
                  "v58.0",
                  0.49
                ],
                [
                  "v57.0",
                  0.32
                ],
                [
                  "v56.0",
                  0.29
                ],
                [
                  "v55.0",
                  0.79
                ],
                [
                  "v54.0",
                  0.18
                ],
                [
                  "v51.0",
                  0.13
                ],
                [
                  "v49.0",
                  2.16
                ],
                [
                  "v48.0",
                  0.13
                ],
                [
                  "v47.0",
                  0.11
                ],
                [
                  "v43.0",
                  0.17
                ],
                [
                  "v29.0",
                  0.26
                ]
              ]
            },
            {
              name: "Eazy Mobile",
              id: "EazyMobile",
              data: [
                [
                  "v58.0",
                  1.02
                ],
                [
                  "v57.0",
                  7.36
                ],
                [
                  "v56.0",
                  0.35
                ],
                [
                  "v55.0",
                  0.11
                ],
                [
                  "v54.0",
                  0.1
                ],
                [
                  "v52.0",
                  0.95
                ],
                [
                  "v51.0",
                  0.15
                ],
                [
                  "v50.0",
                  0.1
                ],
                [
                  "v48.0",
                  0.31
                ],
                [
                  "v47.0",
                  0.12
                ]
              ]
            },
            {
              name: "EMV Card Issues",
              id: "EMVCardIssues",
              data: [
                [
                  "v11.0",
                  6.2
                ],
                [
                  "v10.0",
                  0.29
                ],
                [
                  "v9.0",
                  0.27
                ],
                [
                  "v8.0",
                  0.47
                ]
              ]
            },
            {
              name: "Fees & Commission",
              id: "Fees",
              data: [
                [
                  "v11.0",
                  3.39
                ],
                [
                  "v10.1",
                  0.96
                ],
                [
                  "v10.0",
                  0.36
                ],
                [
                  "v9.1",
                  0.54
                ],
                [
                  "v9.0",
                  0.13
                ],
                [
                  "v5.1",
                  0.2
                ]
              ]
            },
            {
              name: "Loans",
              id: "Loans",
              data: [
                [
                  "v16",
                  2.6
                ],
                [
                  "v15",
                  0.92
                ],
                [
                  "v14",
                  0.4
                ],
                [
                  "v13",
                  0.1
                ]
              ]
            },
            {
              name: "Eazy Wallet",
              id: "EazyWalet",
              data: [
                [
                  "v50.0",
                  0.96
                ],
                [
                  "v49.0",
                  0.82
                ],
                [
                  "v12.1",
                  0.14
                ]
              ]
            }
          ]
        }
      });
     }

     DrawPieChart(){
        Highcharts.chart('container-p4', {
          chart: {
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
            }
          },
          title: {
            text: 'TOP INQUIRIES ' + sessionStorage.getItem('reportingyear')
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                enabled: true,
                format: '{point.name}'
              }
            }
          },
          series: [{
            type: 'pie',
            name: 'Top inquiries',
            data: [
              ['Eazy Mobile', inquirystats.eazyMobile],
              ['EMV Cards', inquirystats.emvCard],
              {
                name: 'Inter bank transfers',
                y: inquirystats.interbankTransfers,
                sliced: true,
                selected: true
              },
              ['Atm issues', inquirystats.atmIssues],
              ['Cardless', inquirystats.cardless],
              ['Escom Token', inquirystats.escomToken],
              ['Loans', inquirystats.loan],
              ['Bank to wallet', inquirystats.bankToWallet],
              ['GOTV', inquirystats.gotv],
              ['DSTV', inquirystats.dstv],
              ['Other', inquirystats.other]
            ]
          }]
        });
     }

     DrawThreeDimensionalBarChart(){
              // Set up the chart
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: 'container-p6',
            type: 'column',
            options3d: {
              enabled: true,
              alpha: 15,
              beta: 15,
              depth: 50,
              viewDistance: 25
            }
          },
          title: {
            text: 'Chart rotation demo'
          },
          subtitle: {
            text: 'Test options by dragging the sliders below'
          },
          plotOptions: {
            column: {
              depth: 25
            }
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }]
        });

        function showValues() {
          $('#alpha-value').html(chart.options.chart.options3d.alpha);
          $('#beta-value').html(chart.options.chart.options3d.beta);
          $('#depth-value').html(chart.options.chart.options3d.depth);
        }

        // Activate the sliders
        $('#sliders input').on('input change', function () {
          chart.options.chart.options3d[this.id] = parseFloat(this.value);
          showValues();
          chart.redraw(false);
        });

        showValues();
     }

     DrawBasicBarChart(){

      Highcharts.chart('chart-container', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Quartely Customer Feedback Report  ' + sessionStorage.getItem('reportingyear')
        },
        subtitle: {
          text: 'Source: <a href="#">www.nbs.mw</a>'
        },
        xAxis: {
          categories: ['1st Qaurter', '2nd Quarter', '3rd Quarter', '4th Quarter'],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Just updated',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' Total'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Complaints',
          data: [quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Complaint' && fx.quarter== 1)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Complaint' && fx.quarter== 2)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Complaint' && fx.quarter== 3)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Complaint' && fx.quarter== 4)[0].total]
        }, {
          name: 'Inquiries',
          data: [quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Inquiry' && fx.quarter== 1)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Inquiry' && fx.quarter== 2)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Inquiry' && fx.quarter== 3)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Inquiry' && fx.quarter== 4)[0].total]
        }, {
          name: 'Compliments',
          data: [quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Compliment' && fx.quarter== 1)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Compliment' && fx.quarter== 2)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Compliment' && fx.quarter== 3)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Compliment' && fx.quarter== 4)[0].total]
        }, {
          name: 'Requests',
          data: [quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 1)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 2)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 3)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Request' && fx.quarter== 4)[0].total]
        },
        {
          name: 'Queries',
          data: [quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Query' && fx.quarter== 1)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Query' && fx.quarter== 2)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Query' && fx.quarter== 3)[0].total,
                 quartelydrilldownstats.filter((fx)=>fx.caseCategory=='Query' && fx.quarter== 4)[0].total]
        }]
      });
     }

     InitializeChart(){
        let reportingyear = parseInt(sessionStorage.getItem('reportingyear'));
        //console.log('set year' + year);
        //let reportingyear = year;
        //document.getElementById('rpt_year').value = new Date().getFullYear();
        this.GetComplaints();
        this.QuarterlyStatsDrillDown(reportingyear);
        this.YearlyStatistics(reportingyear);
        this.AllIssueStatistics('Request');
        this.AllIssueStatistics('Query');
        this.AllIssueStatistics('Inquiry');
        this.MonthlyStats(reportingyear);
        let delayinitialisation = setTimeout(()=>{
          if(document.getElementById('chart-container') != null && parseInt(sessionStorage.getItem('usertype'))== 1){
              //this.DrawCombinationChart();
              this.DrawBasicBarChart();
              this.DrawDrillDownChart(reportingyear);
              this.DrawRotatedLabelsChart();
              this.CardStatistics();
              this.DrawPieChart();
              this.DrawPlainChart();
              clearTimeout(delayinitialisation);
            } 
          },3000);
          delayinitialisation;
     }

     CardStatistics(){
        utils.sendHttpRequest('GET','/Home/GetStatistics').then(response =>{
           if(response != null){
             document.getElementById('complements_stats').innerHTML = response.complements;
             document.getElementById('complaints_stats').innerHTML = response.complaints;
             document.getElementById('inquiries_stats').innerHTML = response.inquiries;
             document.getElementById('requests_stats').innerHTML = response.requests;
             document.getElementById('queries_stats').innerHTML = response.queries;
           }
        });
     }

     GetComplaints(){
       utils.sendHttpRequest('GET','/Configuration/GetComplaintStats').then(response =>{
          topcomplaints = response;
        }).catch(error=>console.log(error));
     }

     QuarterlyStats(year){
       utils.sendHttpRequest('GET','/Configuration/GetQuarterlyStatistics?year='+ year).then(response =>{
         this.quartelystatistics = response
        }).catch(error=>console.log(error));
     }

     MonthlyStats=async(year)=>{
        await utils.sendHttpRequest('GET','/Configuration/GetMonthlyStatistics?year='+ year).then(response=>{
          this.monthlystatistics = response;
        }).catch(error=>console.log(error));
     }

     QuarterlyStatsDrillDown(year){
       utils.sendHttpRequest('GET','/Configuration/QuarterlyStatisticsDrillDown?year='+ year).then(response => quartelydrilldownstats = response);
     }

     YearlyStatistics(year){
       utils.sendHttpRequest('GET','/Configuration/GetYearlyStatistics?year='+ year).then(response => this.yearlystatisticsdata =  response).catch(error=>console.log(error));
     }

     AllIssueStatistics(category){
       let url = '/Configuration/GetIssueStatistics?category='+ category + '&year=' + parseInt(sessionStorage.getItem('reportingyear'));
        utils.sendHttpRequest('GET',url).then(response => {
            if(category.match(/Request/)) requeststats = response;
            if(category.match(/Query/)) querystats = response;
            if(category.match(/Inquiry/)) inquirystats = response;
            if(category.match(/Compliment/)) complimentstats = response;
            if(category.match(/Complaint/)) complaintstats = response;
        });
     }
     ReloadCharts=()=>{
       console.log('re-initializing charts...')
       let reportingyear =  parseInt(document.getElementById('rpt_year').value);
       sessionStorage.setItem('reportingyear',reportingyear);
       console.log('session storage: ' + sessionStorage.getItem('reportingyear'));
       this.InitializeChart();
     }
}

class AppConfiguration {

   loadUserProfiles(){
      userprofilegrid = $("#users_tbl").DataTable({
          "ajax": {
              "url": "/DocumentFlow/GetProfiles",
              "contentType": "application/x-www-form-urlencoded",
              "type": "POST",
              "dataType":  "json",
              "dataSrc": function (data) {
                      userprofiledetails = data["res"];
                      for(let i = 0; i < data['res'].length; i ++){
                        if(data["res"][i].lastSignedOnDate !== null){
                          data["res"][i].lastSignedOnDate = utils.SanitiseDate(data["res"][i].lastSignedOnDate);
                        }
                      }
                      return data["res"];
                  }
            },
              "columns": [
                      {data: "firstName"},
                      {data: "lastName"},
                      {data: "userName"},
                      {data: "roleName"},
                      {data: "branch"},
                      {data: "lastSignedOnDate"},
                      {
                          "mData": null,
                          "bSortable": true,
                          "mRender": function (o) { 
                                  let buttons = '<div class="btn-group">'; 
                                      buttons += '<button type="button" rel="tooltip" title="Edit" id=' + o.userId + ' onclick="loadModals(this.id);" class="btn btn-danger btn-link btn-md"';
                                      buttons += 'data-original-title="Edit Task" aria-describedby="tooltip464385">';
                                      buttons += '<i class="fa fa-edit fa-lg"></i><div class="ripple-container"></div></button>';
                                      buttons += '<button type="button" rel="tooltip" title="Delete" id=' + o.userId + ' class="btn btn-danger btn-link btn-md" onclick="DeleteUser(this.id,false);"';
                                      buttons += 'data-original-title="Delete Task" aria-describedby="tooltip464385">';
                                      buttons += '<i class="fa fa-trash fa-lg"></i><div class="ripple-container"></div></button>';
                                      buttons += '</div>';
                                      return buttons;
                              }
                      }
          ],
          "serverSide": "true",
          "order":[0, "asc"],
          "processing":"true",
          "language":{
              "processing":"<span style='color: red; letter-spacing: 0.1em; font-weight: bold;'>loading.Please wait...</span>"
          }
      });
   }

   addUser(userrecord){
     let url = '/Configuration/AddProfile';
     return utils.sendHttpRequest('POST',url,userrecord).then(response=>{
       utils.NotificationManager(response,'User profile');
       if(response[0]==='success') utils.clearInput(userprofile_ui);
       userprofilegrid.clear().draw();
      }).catch(error => utils.NotificationManager([error, 'error'],'User profile'))
   }

   populateUserProfileData = (id)=>{
      let record = userprofiledetails.filter((data)=>data.userId == parseInt(id));
      if(record.length != 0){
         let branch = configuration.branchList.filter((b)=>b.branchName === record[0].branch);
         if(branch != undefined) $('#service_centre').find("option[value='"+ branch[0].branchID +"']").prop('selected','selected').change();
         $('#usertype').find("option[value='"+ record[0].userRole +"']").prop('selected','selected').change();
         $('#profile_status').find("option[value='"+ record[0].status +"']").prop('selected','selected').change();
         document.getElementById('first_name').value = record[0].firstName;
         document.getElementById('middle_name').value = record[0].middleName == undefined? '':record[0].middleName;
         document.getElementById('last_name').value =record[0].lastName;
         document.getElementById('password').value = record[0].password;
         document.getElementById('password2').value = record[0].password;
         document.getElementById('username').value = record[0].userName;
         document.getElementById('email').value = record[0].email;
         document.getElementById('mobile').value = record[0].mobile;
      }
   }

   updateUser(userrecord){
      let url = '/Configuration/UpdateProfile';
      return utils.sendHttpRequest('POST',url,userrecord).then(response=>{
        utils.NotificationManager(response, 'User profile');
        userprofilegrid.clear().draw();
      }).catch(error=>utils.NotificationManager([error, 'error'],'User profile'));
   }

   deleteUser(id){
      let url = '/Configuration/DeleteProfile';
      let userid = parseInt(sessionStorage.getItem('UserId'));
      return utils.sendHttpRequest('POST',url,userid).then(response=>{
        utils.NotificationManager(response, 'User profile');
        userprofilegrid.clear().draw();
      }).catch(error=>utils.NotificationManager([error, 'error'],'User profile'))
   }

}

class DataValidator {
  validationschecker =[];
  
  formatDate =(rawdate)=>{
       return moment(rawdate).format('YYYY-MM-DD hh:mm:ss');
  }

  registerCheckedElement =(id, status)=>{
      let index = -1;
      let checked = this.validationschecker.find((el,i) =>{ 
          if(el.element === id){
              index = i;
              return i;
          }
      });
      if(index != -1){
         this.validationschecker[index].status = status;
         
      } else {
         this.validationschecker.push({element: id, status: status});
      }
      return checked;
  }

  elementvalidator =(id)=>{
      if(document.getElementById(id).dataset.kvaluetype.match(/text/)){
          let errorlabel = 'error-label-' + id;
          document.getElementById(id).style.borderColor = "red";
          let el = document.getElementById(id);
          if(el.value.trim().length != 0){
              let regex = "^[a-zA-Z ]*$";
              let hyphen_regex = "/^a-zA-Z0-9_-$/";
              let special_chars = new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);
              if(el.value.match(regex) || el.value.match(hyphen_regex) || special_chars.test(el.value)){
                  document.getElementById(errorlabel).innerHTML = '';
                  document.getElementById(id).style.borderColor = 'transparent';
                  this.registerCheckedElement(id,'passed');
                 return;
              } else {
                  document.getElementById(errorlabel).innerHTML = 'Invalid input. Please enter text only';
                  document.getElementById(errorlabel).style.color = 'red';
                  this.registerCheckedElement(id,'failed');
              }
          }
          if(el.value.trim().length == 0 && el.required){
              document.getElementById(id).style.borderColor = 'red';
              document.getElementById(errorlabel).innerHTML = '*Required!';
              document.getElementById(errorlabel).style.color = 'red';
              this.registerCheckedElement(id,'failed');
          }
      }
      if(document.getElementById(id).dataset.kvaluetype ==='alphanumeric'){
          let errorlabel = 'error-label-' + id;
          document.getElementById(id).style.borderColor = "red";
          let el = document.getElementById(id);
          if(el.value.trim().length != 0){
              let myregex = new RegExp(/^[A-Za-z0-9\s]*$/);
              if(myregex.test(el.value)){
                  document.getElementById(errorlabel).innerHTML = '';
                  document.getElementById(id).style.borderColor = 'transparent';
                  this.registerCheckedElement(id,'passed');
              } else {
                  document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
                  document.getElementById(errorlabel).style.color = 'red';
                  this.registerCheckedElement(id,'failed');
              }
          }
          if(el.value.trim().length == 0 && el.required){
              document.getElementById(errorlabel).innerHTML = 'Required!';
              document.getElementById(errorlabel).style.color = 'red';
              this.registerCheckedElement(id,'failed');
              return;
          }
      }
      if(document.getElementById(id).dataset.kvaluetype.match(/phonenumber/)){
          let errorlabel = 'error-label-' + id;
          document.getElementById(id).style.borderColor = "red";
          let el = document.getElementById(id);
          if(el.value.trim().length != 0){
             let regex = "^[0]{1}[0-9]{9}$";
             if(el.value.match(regex)){
               document.getElementById(errorlabel).innerHTML = '';
               document.getElementById(id).style.borderColor = 'transparent';
               this.registerCheckedElement(id,'passed');
             } else {
               document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
               document.getElementById(errorlabel).style.color = 'red';
               this.registerCheckedElement(id,'failed');
             }
          }
          if(el.value.trim().length == 0 && el.required){
              document.getElementById(errorlabel).innerHTML = 'Required!';
              document.getElementById(errorlabel).style.color = 'red';
              this.registerCheckedElement(id,'failed');
              return;
          }
      }
      if(document.getElementById(id).dataset.kvaluetype.match(/email/)){
          let errorlabel = 'error-label-' + id;
          document.getElementById(id).style.borderColor = 'red';
          let el = document.getElementById(id);
          if(el.value.trim().length != 0){
              if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.value)){
                document.getElementById(errorlabel).innerHTML = '';
                document.getElementById(id).style.borderColor = 'transparent';
                this.registerCheckedElement(id,'passed');
              } else {
                document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
                document.getElementById(errorlabel).style.color = 'red';
                this.registerCheckedElement(id,'failed');
              }
          }
          if(el.value.trim().length == 0 && el.required){
              document.getElementById(errorlabel).innerHTML = 'Required!';
              document.getElementById(errorlabel).style.color = 'red';
              this.registerCheckedElement(id,'failed');
              return;
          }
      }
      if(document.getElementById(id).dataset.kvaluetype ==='numeric'){
          let errorlabel = 'error-label-' + id;
          document.getElementById(id).style.borderColor = 'red';
          let el = document.getElementById(id);
          if(el.value.trim().length != 0){
              let regex = "^[0-9]+$";
              if(el.value.match(regex)){
                 document.getElementById(errorlabel).innerHTML = '';
                 document.getElementById(id).style.borderColor = 'transparent';
                 this.registerCheckedElement(id,'passed');
                 return;
              } else {
                 document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
                 document.getElementById(errorlabel).style.color = 'red';
                 this.registerCheckedElement(id,'failed');
              }
          }
          if(el.value.trim().length == 0 && el.required){
              document.getElementById(errorlabel).innerHTML = 'Required!';
              document.getElementById(errorlabel).style.color = 'red';
              this.registerCheckedElement(id,'failed');
              return;
          }
      }
      if(document.getElementById(id).dataset.kvaluetype === 'password'){
        let errorlabel = 'error-label-' + id;
        document.getElementById(id).style.borderColor = 'red';
        let el = document.getElementById(id);
        if(el.value.trim().length != 0){
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(el.value)){
              document.getElementById(errorlabel).innerHTML = '';
              document.getElementById(id).style.borderColor = 'transparent';
              this.registerCheckedElement(id,'passed');
            } else {
                document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
                document.getElementById(errorlabel).style.color = 'red';
                this.registerCheckedElement(id,'failed');
            }
         }
         if(el.value.trim().length == 0 && el.required){
            document.getElementById(errorlabel).innerHTML = 'Required!';
            document.getElementById(errorlabel).style.color = 'red';
            this.registerCheckedElement(id,'failed');
            return;
          }
      }
  }

  clearFormFields =()=>{
      this.validationschecker.forEach(el =>{
          document.getElementById(el.element).value = '';
      });
  }

  disposeValidationsObject =()=> this.validationschecker = [];

  setSelectBoxValue =(elem, index)=>{
      index = index.toString();
      let listbox = document.getElementById(elem);
      for (let i = 0; i < listbox.options.length; ++i) {
          if(listbox.options[i].value === index) listbox.options[i].selected = true;
      }
  }

  passwordMatchCheck =(passfield1,passfield2)=>{
      let inputfield1 = document.getElementById(passfield1).value;
      let inputfield2 = document.getElementById(passfield2).value;
      let el = document.getElementById(passfield2);
      let errorlabel = 'error-label-' + passfield2;
      if(inputfield1 === inputfield2){
         document.getElementById(errorlabel).innerHTML = '';
         console.log(passfield2);
         document.getElementById(passfield2).style.borderColor = 'transparent';
         return;
      } else {
        document.getElementById(errorlabel).innerHTML = el.dataset.requiredError;
        document.getElementById(errorlabel).style.color = 'red';
        this.registerCheckedElement(passfield2,'failed');
        return;
      }
  }

  flagfailedValidations=()=>{
     let failedItems = this.validationschecker.filter(r=>r.status === 'failed');
     for(let i = 0; i < failedItems.length; i ++){
        this.elementvalidator(failedItems[i].element);
     }
  }
  
}

class FeedBackForm {
    submitfeedbackform=(form)=>{
      let url = '/DocumentFlow/SubmitFeedBackForm';
      return utils.sendHttpRequest('POST',url,form).then(response=>{
        utils.NotificationManager(response,'Submit Form');
       }).catch(error => utils.NotificationManager([error, 'error'],'Customer feedback form'))
    }
}


        