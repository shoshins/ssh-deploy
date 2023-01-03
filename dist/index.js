#!/usr/bin/env node
(()=>{var e={898:(e,s,r)=>{"use strict";var o=r(81).spawn;var t=r(837);var escapeSpaces=function(e){if(typeof e==="string"){return e.replace(/\b\s/g,"\\ ")}else{return e}};var escapeSpacesInOptions=function(e){["src","dest","include","exclude","excludeFirst"].forEach((function(s){var r=e[s];if(typeof r==="string"){e[s]=escapeSpaces(r)}else if(Array.isArray(r)===true){e[s]=r.map(escapeSpaces)}}));return e};e.exports=function(e,s){e=e||{};e=t._extend({},e);e=escapeSpacesInOptions(e);var r=e.platform||process.platform;var n=r==="win32";if(typeof e.src==="undefined"){throw new Error("'src' directory is missing from options")}if(typeof e.dest==="undefined"){throw new Error("'dest' directory is missing from options")}var c=e.dest;if(typeof e.host!=="undefined"){c=e.host+":"+e.dest}if(!Array.isArray(e.src)){e.src=[e.src]}var i=[].concat(e.src);i.push(c);var a=(e.args||[]).find((function(e){return e.match(/--chmod=/)}));if(n&&!a){i.push("--chmod=ugo=rwX")}if(typeof e.host!=="undefined"||e.ssh){i.push("--rsh");var d="ssh";if(typeof e.port!=="undefined"){d+=" -p "+e.port}if(typeof e.privateKey!=="undefined"){d+=" -i "+e.privateKey}if(typeof e.sshCmdArgs!=="undefined"){d+=" "+e.sshCmdArgs.join(" ")}i.push(d)}if(e.recursive===true){i.push("--recursive")}if(e.times===true){i.push("--times")}if(e.syncDest===true||e.deleteAll===true){i.push("--delete");i.push("--delete-excluded")}if(e.syncDestIgnoreExcl===true||e.delete===true){i.push("--delete")}if(e.dryRun===true){i.push("--dry-run");i.push("--verbose")}if(typeof e.excludeFirst!=="undefined"&&t.isArray(e.excludeFirst)){e.excludeFirst.forEach((function(e,s){i.push("--exclude="+e)}))}if(typeof e.include!=="undefined"&&t.isArray(e.include)){e.include.forEach((function(e,s){i.push("--include="+e)}))}if(typeof e.exclude!=="undefined"&&t.isArray(e.exclude)){e.exclude.forEach((function(e,s){i.push("--exclude="+e)}))}switch(e.compareMode){case"sizeOnly":i.push("--size-only");break;case"checksum":i.push("--checksum");break}if(typeof e.args!=="undefined"&&t.isArray(e.args)){i=[...new Set([...i,...e.args])]}i=[...new Set(i)];var noop=function(){};var l=e.onStdout||noop;var u=e.onStderr||noop;var f="rsync ";i.forEach((function(e){if(e.substr(0,4)==="ssh "){e='"'+e+'"'}f+=e+" "}));f=f.trim();if(e.noExec){s(null,null,null,f);return}try{var p="";var h="";var y;if(n){y=o("cmd.exe",["/s","/c",'"'+f+'"'],{windowsVerbatimArguments:true,stdio:[process.stdin,"pipe","pipe"]})}else{y=o("/bin/sh",["-c",f])}y.stdout.on("data",(function(e){l(e);p+=e}));y.stderr.on("data",(function(e){u(e);h+=e}));y.on("exit",(function(e){var r=null;if(e!==0){r=new Error("rsync exited with code "+e);r.code=e}s(r,p,h,f)}))}catch(e){s(e,null,null,f)}}},505:(e,s,r)=>{const{existsSync:o,mkdirSync:t,writeFileSync:n}=r(147);const{join:c}=r(17);const validateDir=e=>{if(!e){console.warn("⚠️ [DIR] dir is not defined");return}if(o(e)){console.log(`✅ [DIR] ${e} dir exist`);return}console.log(`[DIR] Creating ${e} dir in workspace root`);t(e);console.log("✅ [DIR] dir created.")};const handleError=(e,s)=>{if(s){throw new Error(e)}console.warn(e)};const writeToFile=({dir:e,filename:s,content:r,isRequired:t,mode:i="0644"})=>{validateDir(e);const a=c(e,s);if(o(a)){const e=`⚠️ [FILE] ${a} Required file exist.`;handleError(e,t);return}try{console.log(`[FILE] writing ${a} file ...`,r.length);n(a,r,{encoding:"utf8",mode:i})}catch(e){const s=`⚠️[FILE] Writing to file error. filePath: ${a}, message:  ${e.message}`;handleError(s,t)}};const validateRequiredInputs=e=>{const s=Object.keys(e);const r=s.filter((s=>{const r=e[s];if(!r){console.error(`❌ [INPUTS] ${s} is mandatory`)}return r}));if(r.length!==s.length){throw new Error("⚠️ [INPUTS] Inputs not valid, aborting ...")}};const snakeToCamel=e=>e.replace(/[^a-zA-Z0-9]+(.)/g,((e,s)=>s.toUpperCase()));e.exports={writeToFile:writeToFile,validateRequiredInputs:validateRequiredInputs,snakeToCamel:snakeToCamel}},229:(e,s,r)=>{const{snakeToCamel:o}=r(505);const t=["REMOTE_HOST","REMOTE_USER","REMOTE_PORT","SSH_PRIVATE_KEY","DEPLOY_KEY_NAME","SOURCE","TARGET","ARGS","SSH_CMD_ARGS","EXCLUDE","SCRIPT_BEFORE","SCRIPT_AFTER"];const n=process.env.GITHUB_WORKSPACE;const c=process.env.REMOTE_USER;const i={source:"./",target:`/home/${c}/`,exclude:"",args:"-rlgoDzvc -i",sshCmdArgs:"-o StrictHostKeyChecking=no",deployKeyName:`deploy_key_${c}_${Date.now()}`};const a={githubWorkspace:n};t.forEach((e=>{const s=o(e.toLowerCase());const r=process.env[e]||process.env[`INPUT_${e}`];const t=r===undefined?i[s]:r;let n=t;switch(s){case"source":n=t.indexOf(" ")>-1?t.split(" "):t||"./";break;case"args":n=t.split(" ");break;case"exclude":case"sshCmdArgs":n=t.split(",").map((e=>e.trim()));break}a[s]=n}));a.sshServer=`${a.remoteUser}@${a.remoteHost}`;a.rsyncServer=`${a.remoteUser}@${a.remoteHost}:${a.target}`;e.exports=a},976:(e,s,r)=>{const{exec:o}=r(81);const{sshServer:t,githubWorkspace:n}=r(229);const{writeToFile:c}=r(505);const handleError=(e,s,r)=>{if(s){r(new Error(e))}else{console.warn(e)}};const remoteCmd=async(e,s,r,i)=>new Promise(((a,d)=>{const l=`local_ssh_script-${i}.sh`;try{c({dir:n,filename:l,content:e});console.log(`Executing remote script: ssh -i ${s} ${t}`);o(`DEBIAN_FRONTEND=noninteractive ssh -i ${s} -o StrictHostKeyChecking=no ${t} 'RSYNC_STDOUT="${process.env.RSYNC_STDOUT}" bash -s' < ${l}`,((e,s,o)=>{if(e){const t=`⚠️ [CMD] Remote script failed: ${e.message}`;console.warn(`${t} \n`,s,o);handleError(t,r,d)}else{console.log("✅ [CMD] Remote script executed. \n",s,o);a(s)}}))}catch(e){handleError(e.message,r,d)}}));e.exports={remoteCmdBefore:async(e,s,r)=>remoteCmd(e,s,r,"before"),remoteCmdAfter:async(e,s,r)=>remoteCmd(e,s,r,"after")}},447:(e,s,r)=>{const{execSync:o}=r(81);const t=r(898);const nodeRsyncPromise=async e=>new Promise(((s,r)=>{const logCMD=e=>{console.warn("================================================================");console.log(e);console.warn("================================================================")};try{t(e,((e,o,t,n)=>{if(e){console.error("❌ [Rsync] error: ");console.error(e);console.error("❌ [Rsync] stderr: ");console.error(t);console.error("❌️ [Rsync] stdout: ");console.error(o);console.error("❌ [Rsync] command: ");logCMD(n);r(new Error(`${e.message}\n\n${t}`))}else{console.log("⭐ [Rsync] command finished: ");logCMD(n);s(o)}}))}catch(e){console.error("❌ [Rsync] command error: ",e.message,e.stack);r(e)}}));const validateRsync=async()=>{try{o("rsync --version",{stdio:"inherit"});console.log("✅️ [CLI] Rsync exists");return}catch(e){console.warn("⚠️ [CLI] Rsync doesn't exists",e.message)}console.log('[CLI] Start rsync installation with "apt-get" \n');try{o("sudo DEBIAN_FRONTEND=noninteractive apt-get -y update && sudo DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends -y install rsync",{stdio:"inherit"});console.log("✅ [CLI] Rsync installed. \n")}catch(e){throw new Error(`⚠️ [CLI] Rsync installation failed. Aborting ... error: ${e.message}`)}};const rsyncCli=async({source:e,rsyncServer:s,exclude:r,remotePort:o,privateKeyPath:t,args:n,sshCmdArgs:c})=>{console.log(`[Rsync] Starting Rsync Action: ${e} to ${s}`);if(r&&r.length>0)console.log(`[Rsync] excluding folders ${r}`);const i={ssh:true,recursive:true,onStdout:e=>console.log(e.toString()),onStderr:e=>console.error(e.toString())};return nodeRsyncPromise({...i,src:e,dest:s,excludeFirst:r,port:o,privateKey:t,args:n,sshCmdArgs:c})};const sshDeploy=async e=>{await validateRsync();const s=await rsyncCli(e);console.log("✅ [Rsync] finished.",s);process.env.RSYNC_STDOUT=`${s}`;return s};e.exports={sshDeploy:sshDeploy}},822:(e,s,r)=>{const{join:o}=r(17);const{execSync:t}=r(81);const{writeToFile:n}=r(505);const c="known_hosts";const getPrivateKeyPath=(e="")=>{const{HOME:s}=process.env;const r=o(s||"~",".ssh");const t=o(r,c);return{dir:r,filename:e,path:o(r,e),knownHostsPath:t}};const addSshKey=(e,s)=>{const{dir:r,filename:o}=getPrivateKeyPath(s);n({dir:r,filename:c,content:""});console.log("✅ [SSH] known_hosts file ensured",r);n({dir:r,filename:o,content:e,isRequired:true,mode:"0400"});console.log("✅ [SSH] key added to `.ssh` dir ",r,o)};const updateKnownHosts=e=>{const{knownHostsPath:s}=getPrivateKeyPath();console.log("[SSH] Adding host to `known_hosts` ....",e,s);try{t(`ssh-keyscan -H ${e}  >> ${s}`,{stdio:"inherit"})}catch(s){console.error("❌ [SSH] Adding host to `known_hosts` ERROR",e,s.message)}console.log("✅ [SSH] Adding host to `known_hosts` DONE",e,s)};e.exports={getPrivateKeyPath:getPrivateKeyPath,updateKnownHosts:updateKnownHosts,addSshKey:addSshKey}},81:e=>{"use strict";e.exports=require("child_process")},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")},837:e=>{"use strict";e.exports=require("util")}};var s={};function __nccwpck_require__(r){var o=s[r];if(o!==undefined){return o.exports}var t=s[r]={exports:{}};var n=true;try{e[r](t,t.exports,__nccwpck_require__);n=false}finally{if(n)delete s[r]}return t.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r={};(()=>{const{sshDeploy:e}=__nccwpck_require__(447);const{remoteCmdBefore:s,remoteCmdAfter:r}=__nccwpck_require__(976);const{addSshKey:o,getPrivateKeyPath:t,updateKnownHosts:n}=__nccwpck_require__(822);const{validateRequiredInputs:c}=__nccwpck_require__(505);const i=__nccwpck_require__(229);const run=async()=>{const{source:a,remoteUser:d,remoteHost:l,remotePort:u,deployKeyName:f,sshPrivateKey:p,args:h,exclude:y,sshCmdArgs:m,scriptBefore:g,scriptAfter:_,rsyncServer:w}=i;c({sshPrivateKey:p,remoteHost:l,remoteUser:d});o(p,f);const{path:v}=t(f);if(g||_){n(l)}if(g){await s(g,v)}await e({source:a,rsyncServer:w,exclude:y,remotePort:u,privateKeyPath:v,args:h,sshCmdArgs:m});if(_){await r(_,v)}};run().then(((e="")=>{console.log("✅ [DONE]",e)})).catch((e=>{console.error("❌ [ERROR]",e.message);process.exit(1)}))})();module.exports=r})();