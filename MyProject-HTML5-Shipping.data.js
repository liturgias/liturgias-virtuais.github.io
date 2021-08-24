
var Module = typeof Module !== 'undefined' ? Module : {};

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'D:/a/w/Binaries/HTML5/MyProject-HTML5-Shipping.data';
    var REMOTE_PACKAGE_BASE = 'MyProject-HTML5-Shipping.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'MyProject', true, true);
Module['FS_createPath']('/MyProject', 'Content', true, true);
Module['FS_createPath']('/MyProject/Content', 'Movies', true, true);
Module['FS_createPath']('/MyProject/Content/Movies', 'fernanda', true, true);
Module['FS_createPath']('/MyProject/Content/Movies', 'golin', true, true);
Module['FS_createPath']('/MyProject/Content/Movies', 'luna', true, true);
Module['FS_createPath']('/MyProject/Content/Movies', 'xavier', true, true);
Module['FS_createPath']('/MyProject/Content', 'Paks', true, true);

    function DataRequest(start, end, audio) {
      this.start = start;
      this.end = end;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
        this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

        var files = metadata.files;
        for (var i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // Reuse the bytearray from the XHR as the source for file reads.
        DataRequest.prototype.byteArray = byteArray;
  
          var files = metadata.files;
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_D:/a/w/Binaries/HTML5/MyProject-HTML5-Shipping.data');

    };
    Module['addRunDependency']('datafile_D:/a/w/Binaries/HTML5/MyProject-HTML5-Shipping.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"start": 0, "audio": 0, "end": 349, "filename": "/Manifest_NonUFSFiles_HTML5.txt"}, {"start": 349, "audio": 0, "end": 387, "filename": "/UE4CommandLine.txt"}, {"start": 387, "audio": 0, "end": 4551297, "filename": "/MyProject/Content/Movies/fernanda/moon.wmv"}, {"start": 4551297, "audio": 0, "end": 26666752, "filename": "/MyProject/Content/Movies/golin/paineis-bonitos.mov"}, {"start": 26666752, "audio": 0, "end": 38976934, "filename": "/MyProject/Content/Movies/luna/dedicado-a-sara.m4v"}, {"start": 38976934, "audio": 0, "end": 143779933, "filename": "/MyProject/Content/Movies/xavier/aniquilacao.wmv"}, {"start": 143779933, "audio": 0, "end": 786427082, "filename": "/MyProject/Content/Paks/MyProject-HTML5.pak"}], "remote_package_size": 786427082, "package_uuid": "fa9ca92c-2261-43c9-8c93-e3ad75b239fe"});

})();

$(document).ready(function(){
    
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    var db;
    
    if (!window.indexedDB) {
        alert("Seu navegavor não suporta a API IndexedDB.");
    } else {
        bdTarefas();        
    }   

    function bdTarefas(){
        var request = indexedDB.open("Tarefas", 1);  
        request.onsuccess = function (evt) {
            db = request.result;
            $('#categoria').val('Entrada');
            var categoria = $('#categoria').val();
            $('#tarefa').attr('placeholder', "Adicionar um item em \"" + categoria + "\"");        
            listaTarefas();
            listaCategorias();
        };

        request.onerror = function (evt) {
            console.log("IndexedDB error: " + evt.target.errorCode);
        };

        request.onupgradeneeded = function (evt) {
            var storeTarefas = evt.currentTarget.result.createObjectStore("tarefas", { keyPath: "id", autoIncrement: true });
            storeTarefas.createIndex("tarefa", "tarefa", { unique: false });
            storeTarefas.createIndex("categoria", "categoria", { unique: false });
            var storeCategorias = evt.currentTarget.result.createObjectStore("categorias", { keyPath: "id", autoIncrement: true });
            storeCategorias.createIndex("categoria", "categoria", { unique: true });
        };
    }
    
    function listaTarefas() {
        var tarefas = $('.listaTarefas');
        tarefas.empty();        
        var transaction = db.transaction("tarefas", "readwrite");
        var objectStore = transaction.objectStore("tarefas");

        var req = objectStore.openCursor();
        req.onsuccess = function(evt) {  
            var cursor = evt.target.result;  
            if (cursor) {
                if(cursor.value.categoria == $('#categoria').val()) {
                    var linha  = "<li>" + cursor.value.tarefa + "<a href='#' id='" + cursor.key + "'>[ Delete ]</a></li>";
                    $('.listaTarefas').append(linha);
                }
                cursor.continue();  
            }  
        };          
    }
    
    function listaCategorias() {
        var tarefas = $('.listaCategorias');
        tarefas.empty();        
        $('.listaCategorias').append("<li id='Entrada' class='categorias ativo'>Entrada</li>");
        var transaction = db.transaction("categorias", "readwrite");
        var objectStore = transaction.objectStore("categorias");

        var req = objectStore.openCursor();
        req.onsuccess = function(evt) {  
            var cursor = evt.target.result;  
            if (cursor) {
                var linha  = "<li id='"+ cursor.value.categoria +"' class='categorias'>" + cursor.value.categoria + "<a href='" + cursor.value.categoria + "' id='"+cursor.key+"'>[ X ]</a></li>";
                $('.listaCategorias').append(linha);
                cursor.continue();  
            } else {
                $('.listaCategorias').append('<li id="nova">+ Adicionar Nova Categoria</li>');                                
            }
        };   
    }    
    
    function insereTarefa() {
        var categoria = $('#categoria').val();
        var tarefa = $("#tarefa").val();

        var transaction = db.transaction("tarefas", "readwrite");
        var objectStore = transaction.objectStore("tarefas");                    
        var request = objectStore.add({tarefa: tarefa, categoria: categoria});
        request.onsuccess = function (evt) {
            $('#tarefa').val('');
            listaTarefas(); 
        };                   
    }    
    
    function insereCategoria() {
        var categoria = $('#nova_categoria').val();

        var transaction = db.transaction("categorias", "readwrite");
        var objectStore = transaction.objectStore("categorias");                    
        var request = objectStore.add({categoria: categoria});
        request.onsuccess = function (evt) {
            $('#nova_categoria').val('');
            listaCategorias(); 
        };                   
    }        
    
    function deletaTarefa(id) {
        var transaction = db.transaction("tarefas", "readwrite");
        var store = transaction.objectStore("tarefas");
        var req = store.delete(+id);
        req.onsuccess = function(evt) {  
            listaTarefas();
        };
    }

    function deletaCategoria(id, categoria) {
        var transaction = db.transaction("categorias", "readwrite");
        var store = transaction.objectStore("categorias");
        var req = store.delete(+id);
        req.onsuccess = function(evt) {
            limpaTarefasSemCategoria(categoria);
            bdTarefas();
        };
    }
    
    function limpaTarefasSemCategoria(categoria) {
        var transaction = db.transaction("tarefas", "readwrite");
        var objectStore = transaction.objectStore("tarefas");

        var req = objectStore.openCursor();
        req.onsuccess = function(evt) {  
            var cursor = evt.target.result;  
            if (cursor) {
                if(cursor.value.categoria == categoria) {
                    var del = objectStore.delete(cursor.key);
                }
                cursor.continue();  
            }
        };           
    }

    $('#tarefa').keypress(function (e) {
        if(e.keyCode == 13) {
            insereTarefa();
        }
    });
    
    $('.listaTarefas').on('click', 'a', function(){
        var confirma = confirm('Deseja excluir esta tarefa ?')
        if(confirma) {
            deletaTarefa(this.id);
            return false;
        }
    });
    
    $('.listaCategorias').on('click', 'a', function(){
        var confirma = confirm('Deseja excluir esta categoria ?\nATENÇÃO: Esta ação excluirá todas as tarefas vinculadas a esta categoria!')
        if(confirma){
            var id = this.id;
            var categoria = $(this).parent().get(0).id;
            deletaCategoria(id, categoria);       
        }
        return false;        
    });    
    
    $('.listaCategorias').on('keypress', '#nova_categoria', function(e) {
        if(e.keyCode == 13) {
            insereCategoria();
        }
    });
    
    $('.listaCategorias').on('click', '.categorias', function(){
        $('nav li').removeClass('ativo');
        $(this).addClass('ativo');        
        $('#categoria').val('');
        var id = this.id;
        $('#categoria').val(id);
        $('#tarefa').attr('placeholder', "Adicionar um item em \"" + id + "\"");        
        listaTarefas();
    });
    
    $('.listaCategorias').on('click','#nova', function(){
        $(this).replaceWith('<li id="nova"><input type="text" name="nova_categoria" id="nova_categoria" placeholder="Adicionar nova categoria"></li>')
        $('#nova_categoria').focus();
    });
    
    $('.listaCategorias').on('blur', '#nova_categoria', function(){
        $(this).replaceWith('+ Adicionar Nova Categoria')
    });
});            