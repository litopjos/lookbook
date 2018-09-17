/* -----------------------------------------------
FILE: colimgobjs.js

DESCRIPTION:
This file implements an array of ImgObjs objects 
where each ImgObjs object has the following properties:

    id          -> id that uniquely identifies the image.
    img: preview,
    filename,
    fileObj,
    isUploaded  -> boolean true indicates if the image has been
                   uploaded to the server and false indicates its
                   still local.
    fileUrl     -> url pointing to the image.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
const uuid = require('uuid/v1');

export class ColImgObjs {
    constructor (arrImgObjs = []) {
        this.arrImgObjs = arrImgObjs;
    }

    addImgUrl =  (img, filename = "") => {
        const imgObj = this.genImgObj(img,filename,true);

        this.arrImgObjs.push(imgObjs);
    }

    addRemoteUrl = (url)=>{
        const imgObj = this.genImgObj("", "", undefined, true, url);
        this.arrImgObjs.push(imgObj);    
    }

    /*
    addImgBlob = (img, filename = "") =>{
        alert(`addImgBlob()`);

        const imgObj = this.genImgObj(img,filename,false);
  
        this.arrImgObjs.push(imgObj);

    //    console.log(imgObjs);
    //    console.log(this.arrImgObjs);
    //    alert(`addImgBlob(): ${imgObjs}`);
    }
    */

    addFileObj = (fileObj)=>{
        let imgObj = this.genImgObj  (fileObj.preview, fileObj.name, fileObj);
        
        this.arrImgObjs.push(imgObj);    
    }

    genImgObj = (preview = "", filename = "", fileObj = undefined, isUploaded=false, fileUrl = undefined) =>{

        let imgObj = {
            id:  uuid(),
            img: preview,
            filename,
            fileObj,
            isUploaded,
            fileUrl
        };

       return imgObj;
    }

    initWithListOfUrls = (urls)=>{
        urls.map (
            (url)=>this.addRemoteUrl(url)
        );
    }
    getArrImgObjs = ()=>this.arrImgObjs;


}