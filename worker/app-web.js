// Initialize the page
function init() {
    var cur = window.current_drive_order || 0;
    var names = window.drive_names;
    var drive_name = window.drive_names[cur];
    
    document.siteName = $('title').html();
    var html = `
    <header>
      <div id="nav">
      </div>
    </header>
    <div class="container-fluid bg-light" style="padding-top: 60px; padding-bottom: 24px;">
      <div class="container">
        <div id="notifications" class="list-group text-break">
        </div>
        <form action="" class="row g-3">

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-2">
            <label for="" class="form-label">Videos Folder</label>
            
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuFolders" data-bs-toggle="dropdown" aria-expanded="true">${drive_name}</button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuFolders">`;

            names.forEach((name, idx) => {
                html += `<li><a class="dropdown-item" href="/${idx}:/">${name}</a></li>`;
            });
            
          html += `</ul></div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
            <label for="" class="form-label">Playlist ID</label>
            <input type="number" class="form-control" id="playlist_id" placeholder="Enter playlist id" required>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
            <label for="" class="form-label">Thumbnail</label>
            <input type="url" class="form-control" id="thumbnail" placeholder="Enter thumbnail url" required>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-2">
            <label for="" class="form-label">Draft</label>
            <select id="draft" class="form-control form-select" aria-label="Draft">
              <option value="0" selected>Undraft</option>
              <option value="1">Draft</option>
            </select>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-2">
            <label for="Script Type" class="form-label">Script Type</label>
            <select id="script_type" class="form-control form-select" aria-label="Script Type">
              <option value="json" selected>JSON</option>
              <option value="sql">SQL</option>
            </select>
          </div>

          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-start">
            <div class="d-inline-block me-1">Web</div>
            <div class="form-check form-switch d-inline-block">
              <input class="form-check-input" type="checkbox" checked role="switch" id="switch_views">
              <label class="form-check-label" for="switch_views">Scripts</label>
            </div>
          </div>
          
          <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-end">
            <button id="generate_scripts_loading" class="btn btn-dark" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="">Loading...</span>
            </button>
            <button class="btn btn-dark" type="button" id="generate_scripts" onclick="generateScripts(window.location.pathname);">Generate Scripts</button>
          </div>

        </form>
      </div>
    </div>

    <div class="container" id="container_output" style="margin-top: 16px; margin-bottom: 64px;">
        
      <div class="row" style="margin-bottom: 10px;" id="script_view">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4" style="margin-bottom: 6px;">
          <input type="url" class="form-control" id="apiendpoint" placeholder="Enter API endpoint address." required>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4" style="margin-bottom: 6px;">
          <input type="url" class="form-control" id="apikey" placeholder="Enter API key." required>
        </div>
        
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-2" style="margin-bottom: 6px;">
          <button class="btn btn-outline-dark" id="publish" onclick="publishScripts();" style="width: 100%;" type="submit">Publish</button>
        </div>
        
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-2" style="margin-bottom: 6px;">
          <button class="btn btn-outline-dark" style="width: 100%;" id="copy_to_clipboard" type="button" onclick="copyToClipboard();">Copy</button>
        </div>

        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 mt-4">
            <textarea rows="20" class="form-control bg-light" id="output" placeholder="output" readonly></textarea>
        </div>

      </div>
      

      <div class="row" id="web_view">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-2">
          <input type="url" class="form-control border-primary" id="apiendpoint_web_view" placeholder="Enter API endpoint address." required>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-2">
          <input type="url" class="form-control border-primary" id="apikey_web_view" placeholder="Enter API key." required>
        </div>
        
        <div class="col-xm-12 col-sm-12 col-md-12 col-lg-12 mt-4">
            <div id="output_html"></div>
        </div>
      </div>

    </div>


    <div class="container rounded border border-1 bg-light" id="container_loading" style="padding:200px;margin-top: 16px; margin-bottom: 64px border">
      <div class="d-flex justify-content-center"><div class="spinner-border text-black m-5" role="status"><span class="sr-only"></span></div></div>
    </div>

    <div class="container" style="margin-top: 16px; margin-bottom: 64px">
        <div>
          <p class="text-center text-muted">Supported Media Types</p>
          <p class="text-center text-muted">.mp4 | .webm | .avi | .mpg | .mpeg | .mkv | .rm | .rmvb| .mov | .wmv | .asf | .ts | .flv</p>
          </div>
      </div>`;

    $('body').html(html);
}

// Function to Decode Encoded JSON Data
function gdidecode(str) {
    var gdijsorg_0x5579 = ['join', 'toString', '114773LJlqPi', 'charCodeAt', '1evaKJu', '128429mQiVMM', '179727icrnig', '1276161MsgKkV', 'map', '111987FmCZVm', '6IEPbgT', '1924817UdCjIN', '328673bHHLnC', '14sGLkvR'];
    var gdijsorg_0x22bf03 = gdijsorg_0x47d3;
    (function(_0x2015a9, _0x2d2e6f) {
        var _0x194131 = gdijsorg_0x47d3;
        while (!![]) {
            try {
                var _0x50490c = parseInt(_0x194131(0x167)) * -parseInt(_0x194131(0x165)) + parseInt(_0x194131(0x160)) + parseInt(_0x194131(0x15e)) + -parseInt(_0x194131(0x161)) * -parseInt(_0x194131(0x15f)) + parseInt(_0x194131(0x162)) * -parseInt(_0x194131(0x168)) + -parseInt(_0x194131(0x16a)) + parseInt(_0x194131(0x169));
                if (_0x50490c === _0x2d2e6f) break;
                else _0x2015a9['push'](_0x2015a9['shift']());
            } catch (_0x157d6c) {
                _0x2015a9['push'](_0x2015a9['shift']());
            }
        }
    }(gdijsorg_0x5579, 0xf40cd));

    function gdijsorg_0x47d3(_0x4aefd5, _0x2d1551) {
        _0x4aefd5 = _0x4aefd5 - 0x15e;
        var _0x557938 = gdijsorg_0x5579[_0x4aefd5];
        return _0x557938;
    }
    return decodeURIComponent(atob(str)['split']('')[gdijsorg_0x22bf03(0x16b)](function(_0x1cdc7a) {
        var _0x416153 = gdijsorg_0x22bf03;
        return '%' + ('00' + _0x1cdc7a[_0x416153(0x166)](0x0)[_0x416153(0x164)](0x10))['slice'](-0x2);
    })[gdijsorg_0x22bf03(0x163)](''));
}

/**
 * Initiate POST request for listing
 * @param path Path
 * @param params Form params
 * @param resultCallback Success Result Callback
 * @param authErrorCallback Pass Error Callback
 */
function requestListPath(path, params, resultCallback, authErrorCallback) {
    var p = {
        password: params['password'] || null,
        page_token: params['page_token'] || null,
        page_index: params['page_index'] || 0
    };
    $.post(path, p, function(data, status) {
        var res = jQuery.parseJSON(gdidecode(read(data)));
        if (res && res.error && res.error.code == '401') {
            // Password verification failed
            if (authErrorCallback) authErrorCallback(path)
        } else if (res && res.data) {
            if (resultCallback) resultCallback(res, path, p)
        }
    }).fail(function(response) {
        $('#notifications').show().html(`<div class='alert alert-danger' role='alert'> Unable to Get Data from the Server, Something went wrong.</div>`);
    });
}

function generateScripts(path){

  let playlist_id = $('#playlist_id').val();
  let thumbnail   = $('#thumbnail').val();
  let script_type = $('#script_type').val();

  if(playlist_id === undefined || playlist_id === null || playlist_id === "" || thumbnail === undefined || thumbnail === null || thumbnail === ""){
    //show error message.
    //$('#notifications').show();
    $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Please fill all required fields.</div>`);
  }else{
    //hide error message.
    $('#notifications').hide();

    if (script_type === "sql"){
      getGeneratedSQLStatments(path);
      //$("#apiendpoint, #apikey, #publish").hide();
    }else if (script_type === "json"){
      getGeneratedJsonPayloads(path);
      //$("#apiendpoint, #apikey, #publish").show();
    }
  }

}

function getGeneratedSQLStatments(path) {    
    var password = localStorage.getItem('password' + path);

    //show loading / spinner
    $('#generate_scripts').hide();
    $('#generate_scripts_loading').show();

    $('#container_output').hide();
    $('#container_loading').show();
    

    /**
     * Callback after the column list request successfully returns data
     * The result returned by @param res (object)
     * @param path the requested path
     * @param prevReqParams parameters used in request
     */
    function successResultCallback(res, path, prevReqParams) {
      generateSQLStatments(path, res['data']['files']);

      //hide loading / spinner
      $('#generate_scripts').show();
      $('#generate_scripts_loading').hide();
      $('#container_loading').hide();
    }

    // Start requesting data from page 1
    requestListPath(path, {
            password: password
        },
        successResultCallback,
        function(path) {
            
            var pass = prompt("Directory encryption, please enter the password", "");
            localStorage.setItem('password' + path, pass);
            if (pass != null && pass != "") {
              getGeneratedSQLStatments(path);
            } else {
                history.go(-1);
            }
        });
}
function generateSQLStatments(path, files) {
  let html="";
  let statments = "";
  let statment="";
    for (i in files) {
        var item = files[i];
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
           //if mimeType is folder do nathing...
        } else {
            var epn = item.name;
            var p   = UI.second_domain_for_dl ? UI.downloaddomain + path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F') : window.location.origin + path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
            var ext = p.split('.').pop().toLowerCase();

            var name        = removeSpecialChars(item.name.replace('.'+ext,""));
            var playlist_id = $('#playlist_id').val();
            var user_id     = "4";
            var thumbnail   = $('#thumbnail').val();
            var draft       = $('#draft').val();
            var duration    = "01:20:30";
            var datetime    = new Date(Date.now()+(i*1000)).toISOString().slice(0, 19).replace('T', ' ');
            
            if ("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {

                if(JSON.stringify(item.videoMediaMetadata,null,2) === undefined){
                    duration = duration;
                }else{
                    duration = millisecondsToTime(item.videoMediaMetadata.durationMillis);
                }

                statment="INSERT INTO `videos`(`playlist_id`, `user_id`, `name`, `description`, `url`, `duration`, `type`, `thumbnail`, `created_at`, `updated_at`, `featured`, `draft`, `downloads`, `views`) VALUES ("+playlist_id+","+user_id+",'"+name+"','Watch "+name+" from barf entertainment app.','"+p+"','"+duration+"',1,'"+thumbnail+"','"+datetime+"','"+datetime+"',0,"+draft+",0,0);";

                statments += statment;

                html +=`
                  <div class="card border-primary" style="margin-bottom: -1px;">
                  <div class="row g-0 d-flex align-items-center">
                    <div class="col-sm-12 col-md-4 col-lg-3 p-3">
                      <img src="`+thumbnail+`"  class="img-fluid rounded g-0 d-flex align-items-center" alt="image">
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-9">
                      <div class="card-body">
                        <h5 class="card-title text-primary">`+name+`</h5>
                        <p class="card-text"><a class="text-primary text-decoration-none" href="`+p+`" target="_blank">`+p+`</a></p>
                        <div class="text-end px-4 mt-4">
                            <a class="text-primary text-decoration-none" href="`+p+`" target="_blank">
                              <button type="button" class="btn btn-outline-primary btn-sm px-4">Download</button>
                            </a>
                          <button class="btn btn-outline-primary btn-sm px-4" id="publish_script" type="button" data-video="`+statment+`">Publish</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;
            }

            //var videoMediaMetadata=JSON.parse(JSON.stringify(item,null,2)).videoMediaMetadata;
            /*
            { 
                "id": "idfasdf-SZ", 
                  "name": "episode1.mp4",
                  "mimeType": "video/mp4",
                  "modifiedTime": "2022-07-30 19:40:45",
                  "size": "1.83 MB",
                  "videoMediaMetadata": { 
                    "width": 640,
                    "height": 360,
                    "durationMillis": "9880" 
                    } 
            }
            */
        }
    }
    if(statments ===""){
      $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Unable to find videos in this folder.</div>`);
      $('#container_output').hide();
    }else{
      $('#container_output').show();
    }
    $('#output').html(statments);
    $('#output_html').html(html);

}

function getGeneratedJsonPayloads(path) {    
  var password = localStorage.getItem('password' + path);
  //show loading / spanner
  $('#generate_scripts').hide();
  $('#generate_scripts_loading').show();

  $('#container_output').hide();
  $('#container_loading').show();

  /**
   * Callback after the column list request successfully returns data
   * The result returned by @param res (object)
   * @param path the requested path
   * @param prevReqParams parameters used in request
   */
  function successResultCallback(res, path, prevReqParams) {
    generateJsonPayloads(path, res['data']['files']);

    //hide loading / spanner
    $('#generate_scripts').show();
    $('#generate_scripts_loading').hide();
    $('#container_loading').hide();

  }

  // Start requesting data from page 1
  requestListPath(path, {
          password: password
      },
      successResultCallback,
      function(path) {
          
          var pass = prompt("Directory encryption, please enter the password", "");
          localStorage.setItem('password' + path, pass);
          if (pass != null && pass != "") {
            getGeneratedJsonPayloads(path);
          } else {
              history.go(-1);
          }
      });
}
function generateJsonPayloads(path, files){
  let html="";
  let payload="";
  let payloads = "[";
  for (i in files) {
      var item = files[i];
      if (item['mimeType'] == 'application/vnd.google-apps.folder') {
         //if mimeType is folder do nathing...
      } else {
          var epn = item.name;
          var p = UI.second_domain_for_dl ? UI.downloaddomain + path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F') : window.location.origin + path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
          var ext = p.split('.').pop().toLowerCase();
          
          var name = removeSpecialChars(item.name.replace('.'+ext,""));
          var playlist_id = $('#playlist_id').val();
          var user_id     = "4";
          var thumbnail   = $('#thumbnail').val();
          var draft       = $('#draft').val();
          var duration    = "01:20:30";
          var datetime    = new Date(Date.now()+(i*1000)).toISOString().slice(0, 19).replace('T', ' ');

          if ("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {

              if(JSON.stringify(item.videoMediaMetadata,null,2) === undefined){
                  duration = duration;
              }else{
                  duration = millisecondsToTime(item.videoMediaMetadata.durationMillis);
              }

              payload = `{ "playlist_id": `+playlist_id+`,"user_id": `+user_id+`,"name": "`+name+`", "description": "Watch `+name+` from barf entertainment app.", "url": "`+p+`", "duration": "`+duration+`", "type": 1, "thumbnail": "`+thumbnail+`", "featured": 0, "draft": `+draft+`,"created_at":"`+datetime+`","updated_at":"`+datetime+`"}`;

              payloads +=payload+',';

              html +=`
                  <div class="card border-primary" style="margin-bottom: -1px;">
                  <div class="row g-0 d-flex align-items-center">
                    <div class="col-sm-12 col-md-4 col-lg-3 p-3">
                      <img src="`+thumbnail+`"  class="img-fluid rounded g-0 d-flex align-items-center" alt="image">
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-9">
                      <div class="card-body">
                        <h5 class="card-title text-primary">`+name+`</h5>
                        <p class="card-text"><a class="text-primary text-decoration-none" href="`+p+`" target="_blank">`+p+`</a></p>
                        <div class="text-end px-4 mt-4">
                           <button class="btn btn-outline-primary btn-sm px-4" id="copy_script" type="button" data-video='[`+payload+`]'>Copy</button>
                            <a class="text-primary text-decoration-none" href="`+p+`" target="_blank">
                              <button type="button" class="btn btn-outline-primary btn-sm px-4">Download</button>
                            </a>
                          <button class="btn btn-outline-primary btn-sm px-4" id="publish_script" type="button" data-video='[`+payload+`]'>Publish</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;   
          }
      }
  }
  payloads += "]";

  if(payloads ==="[]"){
    $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Unable to find videos in this folder.</div>`);
    $('#container_output').hide();
  }else{
    $('#container_output').show();
    payloads = payloads.replace(',]', ']');
  }
  $('#output').html(payloads);
  $('#output_html').html(html);
}

function publishScript(outputdata){
  
  let api_endpoint = $('#apiendpoint_web_view').val();
  let api_key   = $('#apikey_web_view').val();
  let script_type = $('#script_type').val();
  //let outputdata = outputdata;

  if(api_endpoint === undefined || api_endpoint === null || api_endpoint === "" || api_key === undefined || api_key === null || api_key === ""){
    //show error message.
    $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Please enter API Endpoint and API Key then press Publish.</div>`);
  } else if (outputdata === undefined || outputdata === null || outputdata === ""){
    $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Please re-generate-scripts then press Publish.</div>`);
  }else{
    //hide error message.
    $('#notifications').hide();

    if (script_type === "sql"){
      //alert(outputdata);
      publishSQLStatments(api_endpoint,api_key,outputdata);
    }else if (script_type === "json"){
      //alert(outputdata);
      publishJsonPayloads(api_endpoint,api_key,outputdata);
    }
  }

}

function publishScripts(){

  let api_endpoint = $('#apiendpoint').val();
  let api_key   = $('#apikey').val();
  let script_type = $('#script_type').val();
  let outputdata = $('#output').val();

  if(api_endpoint === undefined || api_endpoint === null || api_endpoint === "" || api_key === undefined || api_key === null || api_key === ""){
    //show error message.
    $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Please enter API Endpoint and API Key then press Publish.</div>`);
  } else if (outputdata === undefined || outputdata === null || outputdata === ""){
    $('#notifications').show().html(`<div class='alert alert-danger text-start' role='alert'>Please re-generate-scripts then press Publish.</div>`);
  }else{
    //hide error message.
    $('#notifications').hide();

    if (script_type === "sql"){
      publishSQLStatments(api_endpoint,api_key,outputdata);
    }else if (script_type === "json"){
      publishJsonPayloads(api_endpoint,api_key,outputdata);
    }
  }

}
function publishSQLStatments(url,apikey,payloads){
  
  $('#container_output').hide();
  $('#container_loading').show();

  var settings = {
    "url": url,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer "+apikey,
      "Content-Type": "application/json"
    },
    "data": payloads,
  };
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
    if(response.status_code === 201){
      $('#output').html("");
      $('#container_loading').hide();
      $('#container_output').show();
      $('#notifications').show().html(`<div class='alert alert-success' role='alert'> New Records are submited successfully, From SQL Statments.</div>`);

    }else{
      $('#container_loading').hide();
      $('#container_output').show();
      $('#notifications').show().html(`<div class='alert alert-danger' role='alert'> Unable to submit new records to the Server, Something went wrong.</div>`);
    }
  }).fail(function (response) {
    //console.log(response);
    $('#container_loading').hide();
    $('#container_output').show();
    $('#notifications').show().html(`<div class='alert alert-danger' role='alert'> Unable to submit new records to the Server, Something went wrong.</div>`);
  });

}
function publishJsonPayloads(url,apikey,payloads){
  
  $('#container_output').hide();
  $('#container_loading').show();

  var settings = {
    "url": url,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer "+apikey,
      "Content-Type": "application/json"
    },
    "data": payloads,
  };
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
    if(response.status_code === 201){
      $('#output').html("");
      $('#container_loading').hide();
      $('#container_output').show();
      $('#notifications').show().html(`<div class='alert alert-success' role='alert'> New Records are submited successfully, From JSON Payloads.</div>`);

    }else{
      $('#container_loading').hide();
      $('#container_output').show();
      $('#notifications').show().html(`<div class='alert alert-danger' role='alert'> Unable to submit new records to the Server, Something went wrong.</div>`);
    }
  }).fail(function (response) {
    //console.log(response);
    $('#container_loading').hide();
    $('#container_output').show();
    $('#notifications').show().html(`<div class='alert alert-danger' role='alert'> Unable to submit new records to the Server, Something went wrong.</div>`);
  });

}

// Listen for fallback events
//The popstate event of the Window interface is fired when the active history entry changes while the user navigates the session history.
window.onpopstate = function() {
    init();
}

// Function to read JSON Data
function read(str) {
    var gdijsorg_0x1207 = ['join', '645298GrGsiK', '8269zzjDhb', '28wpErfD', '11eoSBcm', '3578714TboDnQ', 'slice', '52214BJnTpj', '14039GFHzjM', '187451gnBzKk', 'substr', 'reverse', '1262156NwMIzh', '2nDedhJ', 'split'];
    var gdijsorg_0x570bf1 = gdijsorg_0x158f;

    function gdijsorg_0x158f(_0x32bcea, _0x29ebfd) {
        _0x32bcea = _0x32bcea - 0x150;
        var _0x1207c1 = gdijsorg_0x1207[_0x32bcea];
        return _0x1207c1;
    }(function(_0xbbe83c, _0xbbffd8) {
        var _0x2feec5 = gdijsorg_0x158f;
        while (!![]) {
            try {
                var _0x5d3639 = parseInt(_0x2feec5(0x15c)) * -parseInt(_0x2feec5(0x150)) + -parseInt(_0x2feec5(0x15b)) + -parseInt(_0x2feec5(0x157)) + parseInt(_0x2feec5(0x151)) * parseInt(_0x2feec5(0x152)) + parseInt(_0x2feec5(0x153)) * -parseInt(_0x2feec5(0x156)) + parseInt(_0x2feec5(0x158)) + parseInt(_0x2feec5(0x154));
                if (_0x5d3639 === _0xbbffd8) break;
                else _0xbbe83c['push'](_0xbbe83c['shift']());
            } catch (_0x2894d2) {
                _0xbbe83c['push'](_0xbbe83c['shift']());
            }
        }
    }(gdijsorg_0x1207, 0xd11e8));
    var sa = str[gdijsorg_0x570bf1(0x15d)](''),
        ra = sa[gdijsorg_0x570bf1(0x15a)](),
        ja = ra[gdijsorg_0x570bf1(0x15e)](''),
        aj = ja[gdijsorg_0x570bf1(0x159)](0x18)[gdijsorg_0x570bf1(0x155)](0x0, -0x14);
    return aj;
}

$(function() {
    init();
    $('#generate_scripts_loading').hide();
    $('#container_output').hide();
    $('#container_loading').hide();

    $('#script_type').change(function() {
      $('#output').text('');
      $('#output_html').html('');
    });

    switchViews();
    $('#switch_views').change(function() {
      switchViews();
    });

    $(document).on('click', '#publish_script', function(){
      publishScript($(this).attr('data-video'));
     });

     $(document).on('click', '#copy_script', function(){
      copyToClipboard($(this).attr('data-video'));
     });

});

function switchViews(){
  if($("#switch_views").is(':checked')){
    $('#script_view').show();
    $('#web_view').hide();
  } else{
    $('#script_view').hide();
    $('#web_view').show();
  }
}

// Copy to Clipboard for Direct Links, This will be modified soon with other UI
function copyToClipboard() {
    var copyText = document.getElementById("output");
    copyText.select();
    var text = copyText.value;
    //copyText.setSelectionRange(0, 99999);
    copyText.setSelectionRange(0, text.length);
    document.execCommand("copy");
}

function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = text;
  textarea.select();
  var text = textarea.value;
  //textarea.setSelectionRange(0, 99999);
  textarea.setSelectionRange(0, text.length);
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy";
}

//milliseconds to time
function millisecondsToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}

//remove Special Chars
function removeSpecialChars(str) {
  return str.replace(/(?!\w|\s)./g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
}
