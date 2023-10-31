/* wfp javascript file */
//AUTHOR: COMISH OMAR & Fannie Mangame
//DATE CREATED: 13-Feb-2020
//LAST MODIFIED: 10-May-2020
let requesttype;
let sentinel = false;
let grid;
let casesgrid;
let userprofilegrid;
let filecollection;
let pendingapprovalrequests;
let table = document.createElement('TABLE');
let userprofiledetails;
let slideinterval = 120000;
let applicationstate;
let setautoslide = false;
let topcomplaints;
let quarterlystatistics;
let quartelydrilldownstats;
let yearlystatisctics;
let issuecategorystatistics;
let requeststats;
let complaintstats;
let complimentstats;
let querystats;
let inquirystats;
let globalchart;
let mychart;

const view = {
    uploadfile : ['<form><div class="form-row"><div class="form-group col-md-4"><label for="inputState">Department</label><select id="department" class="form-control" ><option selected disabled>Select...</option><option>ICT</option><option>Compliance</option><option>Markerting</option><option>Legal</option><option>Finance</option></select></div><div class="form-group col-md-4"><label for="inputState">Change Type</label><select id="changetype" class="form-control" ><option selected disabled>Select...</option><option>High</option><option>Normal</option><option>Low</option></select></div><div class="form-group col-md-4"><label for="inputPassword4">Date</label><input type="date" class="form-control datetimepicker" id="date"></div></div><div class="form-row"><div class="form-group col-md-6"><label for="inputPassword4">Name of Initiator</label><input type="text" class="form-control" id="initiator"></div><div class="form-group col-md-6"><label for="inputPassword4">Designation of Initiator</label><input type="text" class="form-control" id="designation"></div></div><div class="form-row"><div class="form-group col-md-4"><label for="inputPassword4">Change Start date</label><input type="date" class="form-control datetimepicker" id="startdate"></div><div class="form-group col-md-4"><label for="inputPassword4">Change completion date</label><input type="date" class="form-control datetimepicker" id="completiondate"></div><div class="form-group col-md-4"><label for="inputPassword4">Change implementation date</label><input type="date" class="form-control datetimepicker" id="implementationdate"></div></div><div class="form-group"><label for="inputAddress">Objectives</label><input type="text" class="form-control" id="objective"></div><div class="form-group"><label for="inputAddress2">Change Description</label><input type="text" class="form-control" id="change" ></div><div class="form-group"><label for="inputAddress2">Testing procedure description</label><input type="text" class="form-control" id="testing" ></div><div class="form-group"><label for="inputAddress2">Verification procedure description</label><input type="text" class="form-control" id="inputAddress2" ></div><div class="form-group"><label for="inputAddress2">Roll back plan</label><input type="text" class="form-control" id="rollback" ></div><div class="form-group form-file-upload form-file-multiple"><input type="file" multiple="" class="inputFileHidden"><div class="input-group"><input type="text" class="form-control inputFileVisible" placeholder="Single File"><span class="input-group-btn"><button type="button" class="btn btn-fab btn-round btn-primary"><i class="material-icons">attach_file</i></button></span></div></div><div class="form-group form-file-upload form-file-multiple"><input type="file" multiple="" class="inputFileHidden"><div class="input-group"><input type="text" class="form-control inputFileVisible" placeholder="Multiple Files" multiple><span class="input-group-btn"><button type="button" class="btn btn-fab btn-round btn-info"><i class="material-icons">layers</i></button></span></div></div><button type="submit" class="btn btn-danger" onclick="comfirmation();">Submit</button></form>'],
    approvals : ['<form><div class="form-row"><div class="form-group col-md-6"><label for="inputState">System</label><select id="department" class="form-control" ><option selected disabled>Select...</option><option>T24 R14</option><option>MITASS (RTGS)</option><option>SWIFT</option><option>ChequePoint</option><option>Postilion</option></select></div><div class="form-group col-md-6"><label for="inputPassword4">Request Date</label><input type="date" class="form-control datetimepicker" id="date"></div></div><div class="form-group"><label for="inputAddress">Product Name</label><input type="text" class="form-control" id="objective"></div><div class="form-row"><div class="form-group col-md-6"><label for="inputPassword4">Name of Originator</label><input type="text" class="form-control" id="initiator"></div><div class="form-group col-md-6"><label for="inputPassword4">Department</label><input type="text" class="form-control" id="designation"></div></div><div class="form-row"><div class="form-group col-md-4"><label for="inputState">Business Priority</label><select id="department" class="form-control" ><option selected disabled>Select...</option><option>High</option><option>Medium</option><option>Low</option></select></div><div class="form-group col-md-4"><label for="inputPassword4">Month/Budget</label><input type="text" class="form-control" id="completiondate"></div><div class="form-group col-md-4"><label for="inputState">Change Type</label><select id="department" class="form-control" ><option selected disabled>Select...</option><option>New</option><option>Amendment</option></select></div></div><div class="form-group"><label for="inputAddress">Brief Business Requirements</label></div><div class="form-row"><div class="form-group col-md-4"><label for="inputPassword4">Requirements</label><input type="text" class="form-control" id="completiondate"></div><div class="form-group col-md-4"><label for="inputPassword4">Audit/Compliance</label><input type="text" class="form-control" id="completiondate"></div><div class="form-group col-md-4"><label for="inputPassword4">Other</label><input type="text" class="form-control" id="completiondate"></div></div><div class="form-group"><label for="inputAddress">Required</label></div><div class="form-row"><div class="form-group col-md-6"><label for="inputPassword4">System Functionality</label><input type="text" class="form-control" id="completiondate"></div><div class="form-group col-md-6"><label for="inputPassword4">Secondary system/Interface Functionality</label><input type="text" class="form-control" id="completiondate"></div></div><div class="form-row"><div class="form-group col-md-4"><label for="inputPassword4">Enquiry</label><input type="text" class="form-control" id="completiondate"></div><div class="form-group col-md-4"><label for="inputPassword4">Dealships</label><input type="text" class="form-control" id="completiondate"></div><div class="form-group col-md-4"><label for="inputPassword4">Report</label><input type="text" class="form-control" id="completiondate"></div></div><div class="form-group"><label for="inputAddress2">Detailed Business Specification of Requirements</label><input type="text" class="form-control" id="change" ></div><div class="form-group"><label for="inputAddress2">Inclusions</label><input type="text" class="form-control" id="testing" ></div><div class="form-group"><label for="inputAddress2">Exclusions</label><input type="text" class="form-control" id="inputAddress2" ></div><div class="form-group"><label for="inputAddress2">Constraints/Dependences</label><input type="text" class="form-control" id="rollback" ></div><div class="form-group"><label for="inputAddress2">New/Impact to existing, Business Product/Process</label><input type="text" class="form-control" id="rollback" ></div><div class="form-group form-file-upload form-file-multiple"><input type="file" multiple="" class="inputFileHidden"><div class="input-group"><input type="text" class="form-control inputFileVisible" placeholder="Single File"><span class="input-group-btn"><button type="button" class="btn btn-fab btn-round btn-primary"><i class="material-icons">attach_file</i></button></span></div></div><div class="form-group form-file-upload form-file-multiple"><input type="file" multiple="" class="inputFileHidden"><div class="input-group"><input type="text" class="form-control inputFileVisible" placeholder="Multiple Files" multiple><span class="input-group-btn"><button type="button" class="btn btn-fab btn-round btn-info"><i class="material-icons">layers</i></button></span></div></div><button type="submit" class="btn btn-danger" onclick="comfirmation();">Submit</button></form>'],
    filehistory: ['<form><div class="form-row"><div class="form-group col-md-6"><label for="userType">User Type</label><select id="userType" class="form-control" ><option selected disabled>Select...</option><option>Permanent</option><option>Temporary</option><option>Consultant</option></select></div><div class="form-group col-md-6"><label for="dateApplied">Date applied</label><input type="date" class="form-control datetimepicker" id="dateApplied"></div></div><div class="form-row"><div class="form-group col-md-4"><label for="employeeName">Employee Name</label><input type="text" class="form-control" id="employeeName"></div><div class="form-group col-md-4"><label for="employeeid">Employee ID</label><input type="text" class="form-control" id="employeeid"></div><div class="form-group col-md-4"><label for="position">Position</label><input type="text" class="form-control" id="position"></div></div><div class="form-row"><div class="form-group col-md-4"><label for="branch">Branch</label><select id="branch" class="form-control" ><option selected disabled>Select...</option><option>High</option><option>Medium</option><option>Low</option></select></div><div class="form-group col-md-4"><label for="department">Department</label><input type="text" class="form-control" id="department"></div><div class="form-group col-md-4"><label for="phoneNumber">Phone Number</label><input type="text" class="form-control" id="phoneNumber"></div></div><div class="form-group"><label for="system">System</label><select id="system" class="form-control" multiple><option selected disabled>Select...</option><option>T24 R14</option><option>MITASS (RTGS)</option><option>SWIFT</option><option>ChequePoint</option><option>Postilion</option></select></div><div class="form-row"><div class="form-group col-md-6"><label for="comment">Comment</label><input type="text" class="form-control" id="comment"></div><div class="form-group col-md-6"><label for="requestedBy">Requested By</label><input type="text" class="form-control" id="requestedBy"></div></div><div class="form-group form-file-upload form-file-multiple"><input type="file" multiple="" class="inputFileHidden"><div class="input-group"><input type="text" class="form-control inputFileVisible" placeholder="Single File"><span class="input-group-btn"><button type="button" class="btn btn-fab btn-round btn-primary"><i class="material-icons">attach_file</i></button></span></div></div><div class="form-group form-file-upload form-file-multiple"><input type="file" multiple="" class="inputFileHidden"><div class="input-group"><input type="text" class="form-control inputFileVisible" placeholder="Multiple Files" multiple><span class="input-group-btn"><button type="button" class="btn btn-fab btn-round btn-info"><i class="material-icons">layers</i></button></span></div></div><button type="submit" class="btn btn-danger" onclick="comfirmation();">Submit</button></form>'],
    dashboard: ['<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"><div class="ecommerce-widget">'
                + '<div class="row"><div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"><div class="card"><div class="card-body">'
                +'<h5 class="text-muted">Complaints</h5><div class="metric-value d-inline-block"><h1 class="mb-1" id="complaints_stats"></h1></div>'
                +'<div class="metric-label d-inline-block float-right text-success font-weight-bold"><span><i class="fa fa-fw fa-arrow-up">'
                +'</i></span><span id="percent_complaints">0%</span></div></div><div id="sparkline-revenue"></div></div></div>'+
                '<div class="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12"><div class="card"><div class="card-body">'
                +'<h5 class="text-muted">Inquiries</h5><div class="metric-value d-inline-block"><h1 class="mb-1" id="inquiries_stats"></h1></div>'
                +'<div class="metric-label d-inline-block float-right text-success font-weight-bold"><span><i class="fa fa-fw fa-arrow-up">'
                +'</i></span><span id="percent_inquiries">0%</span></div></div><div id="sparkline-revenue2"></div></div>'
                +'</div><div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"><div class="card"><div class="card-body">'
                +'<h5 class="text-muted">Compliments</h5><div class="metric-value d-inline-block"><h1 class="mb-1" id="complements_stats"></h1></div>'
                +'<div class="metric-label d-inline-block float-right text-primary font-weight-bold"><span><i class="fa fa-fw fa-arrow-up">'
                +'</i></span><span id="percent_complements">0%</span></div></div><div id="sparkline-revenue3"></div></div></div>'+
                '<div class="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12"><div class="card"><div class="card-body">'
                +'<h5 class="text-muted">Requests</h5><div class="metric-value d-inline-block"><h1 class="mb-1" id="requests_stats"></h1>'
                +'</div><div class="metric-label d-inline-block float-right text-secondary font-weight-bold"><span id="percent_requests">0%</span>'
                +'</div></div><div id="sparkline-revenue4"></div></div></div>'
                +'<div class="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12"><div class="card"><div class="card-body">'
                +'<h5 class="text-muted">Queries</h5><div class="metric-value d-inline-block"><h1 class="mb-1" id="queries_stats"></h1>'
                +'</div><div class="metric-label d-inline-block float-right text-secondary font-weight-bold"><span id="percent_queries">0%</span>'
                +'</div></div><div id="sparkline-revenue4"></div></div></div></div>'
			        	+'<div class="row"><div class="card"><h5 class="card-header"><div class="row"><div class="col-sm-2"><div class="form-group">'
                +'<select class="form-control" id="rpt_year"onchange="dashbordcharts.ReloadCharts();"><option selected="">PICK YEAR</option><option value="2020">YEAR 2020</option><option value ="2021">YEAR 2021</option>'
                +'<option value ="2022">YEAR 2022</option><option value ="2023">YEAR 2023</option><option value ="2024">YEAR 2024</option><option value ="2025">YEAR 2025</option></select></div></div></div></h5>'
				        +'<div class="card-body"><div class="row"><div class="col-md-12">'
					   	+'<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"><div style="text-align:center">'
							+'<span class="dot" id="dot1"></span><span class="dot" id="dot2"></span><span class="dot" id="dot3"></span>'
              +'<span class="dot" id="dot4"></span><span class="dot" id="dot5"></span></div><div class="carousel-inner">'
							+'<div class="carousel-item active"><figure class="highcharts-figure"><div id="chart-container"></div></figure></div>'
              +' <div class="carousel-item"><figure class="highcharts-figure"><div id="container-p2"></div></figure></div>'
              +'<div class="carousel-item"><figure class="highcharts-figure"><div id="container-p3"></div></figure></div>'
              +'<div class="carousel-item"><figure class="highcharts-figure"><div id="container-p4"></div></figure></div>'
              +'<div class="carousel-item"><figure class="highcharts-figure"><div id="container-p5"></div>'
              +'<button id="plain">Plain</button><button id="inverted">Inverted</button></figure></div></div></div></div></div></div>'
              +'<div class="card-footer"><button id="prevchart" onclick="NextPage();">Prev</button><button id="nextchart" onclick="NextPage();">Next</button></div>'   
              +'</div></div></div></div>'],
    wallets: ['<form id = "resultid" enctype="multipart/form-data" method="post" onsubmit="AJAXSubmit(this.id);return false;" >'+
    '<div class="form-row"><div class="form-group col-md-4"><label for="dateApplied">Case date</label>'+
    '<input type="date" class="form-control datetimepicker" id="complaintdate" name="DateApplied">'+
    '</div><div class="form-group col-md-4"><label for="SubmissionMode">Case category</label>'+
    '<select id="issuetype" name="IssueType" class="form-control" ><option selected disabled>Select...</option>'+
    '</select></div><div class="form-group col-md-4"><label for="SubmissionMode">Case type</label><select id="casetype" name="CaseType" class="form-control" >'+
    '<option selected disabled>Select...</option></select></div></div><div class="form-row"><div class="form-group col-md-4">'+
    '<label for="CustomerName">Customer name</label><input type="text" class="form-control" id="customername">'+
    '</div><div class="form-group col-md-4"><label for="ContactNumber">Contact number</label><input type="text" class="form-control" id="contactnumber">'+
    '</div><div class="form-group col-md-4"><label for="AccountNumber">Account number</label><input type="text" class="form-control" id="accountnumber">'+
    '</div></div><div class="form-row"><div class="form-group col-md-4"><label for="dateOfBirth">Date of birth</label>'+
    '<input type="date" class="form-control datetimepicker" id="dateofbirth" name="DateofBirth"></div>'+
'<div class="form-group col-md-4">'+
'<label for="finesFunded">FinES funded</label><select id="finesfunded" name="Finesfunded" class="form-control" >'+
    '<option value="2">No</option><option value="1">Yes</option></select>'+
'</div><div class="form-group col-md-4"><label for="dateOfBirth">Person responsible</label>'+
    '<input type="text" class="form-control" id="personresponsible" name="personresponsible"></div></div>'+ 
'<div class="form-row">'+
'<div class="form-group col-md-4">'+
'<label for="finesFunded">Gender</label><select id="gender" name="Gender" class="form-control" >'+
    '<option value="Male">Male</option><option value="Female">Female</option></select></div>'+
'<div class="form-group col-md-8"><label for="ComplaintNature">Detail /Nature of Case</label>'+
    '<input type="text" class="form-control" id="complaintnature"></div></div><div class="form-row"><div class="form-group col-md-4">'+
    '<label for="SubmissionMode">Mode of Submission</label><select id="submissionmode" name="UserType" class="form-control" >'+
    '<option selected disabled>Select...</option></select></div><div class="form-group col-md-4"><label for="Branch">Branch</label>'+
    '<select id="branch" name="UserType" class="form-control" ><option selected disabled>Select...</option></select>'+
    '</div><div class="form-group col-md-4"><label for="SubmissionMode">Escalation</label><select id="escalation" name="UserType" class="form-control" >'+
    '<option selected disabled>Select department...</option></select></div></div><div class="form-row"><div class="form-group col-md-6">'+
    '<label for="Resolution">Resolution</label><input type="text" class="form-control" id="resolution"></div><div class="form-group col-md-3">'+
    '<label for="ResolutionDate">Date of Resolution</label><input type="date" class="form-control datetimepicker" id="resolutiondate" name="ResolutionDate">'+
    '</div><div class="form-group col-md-3"><label for="SubmissionMode">Status</label><select id="status" name="status" class="form-control" >'+
    '<option selected disabled>Select...</option></select></div></div>'+
'<div class="form-row"><div class="form-group col-md-8">'+
    '<label for="Comments">Comments</label><input type="text" class="form-control" id="remarks"></div>'+
'<div class="form-group col-md-4">'+
'<label for="finesFunded">Resosultion accepted</label><select id="resolutionaccepted" name="resolutionaccepted" class="form-control" >'+
    '<option value="2">No</option><option value="1">Yes</option></select></div>'+
'</div><div class="form-control">'+
    '</div></div><button type="button" class="btn btn-danger" onclick="SubmitFeedBackForm();">Submit</button></form></form>'],
    AdminApprove: ['<div class="table-responsive"><table id="cases_tbl" class="display" width="100%">'+
                    '<thead><tr><th>Ref No</th><th id="spot-1">Date of Complaints</th><th id="spot-2">Complainant Details</th><th>Gender</th><th>Age</th><th>Mode of Submission</th>'+
                    '<th>Branch/Service centre involved</th><th id="spot-3">Nature/Details of Complaint</th><th>Resolution</th><th>Responsible Person</th>'+
                    '<th>Date of Resolution</th><th>Acceptance of resolution by Complainant</th><th>Comments</th>'+
                    '</tr></thead></tbody></table></div>'],
    settings: [ '<div class="row">'+
              '<!--<div class="col-md-3 pr-1"><div class="card card-chart"><div class="card-header">General</div>'+
              '<div class="card-body"><input type="checkbox" value="" id="autoslidedashboard" data-toggle="checkbox" onchange="SetAutoSlide(this.id);"> Dashboard chart auto slide'+
              '</div><div class="card-footer" style="line-spacing: 1px, font-size: 8px !important;"></div></div>-->'+
              '</div><div class="col-md-12 pr-1"><div class="card card-chart"><div class="card-header">User profile management</div>'+
              '<div class="card-body"><div class="table-responsive"><table id="users_tbl" class="display"><thead><tr><th>First Name</th><th>Last Name</th><th>UserName</th><th>User Type</th>'+
              '<th>Service centre</th><th>Last Login date</th><th></th></tr></thead><tbody></tbody></table></div>'+
              '</div><div class="card-footer" style="line-spacing: 1px, font-size: 8px !important;"></div></div></div></div>']
    
};


class wfp {
   uploadFile(){
     console.log('file uploaded');
   }
}


