const async = require("async");
const DB = require("./models");
const path = require("path");

const { createWriteStream, stat, mkdir } = require("fs");

function prepareDir(filePath){
    return new Promise((resolve, reject)=>{
        async.waterfall([
            (cb)=>{
                stat(filePath, function(err){
                    if(err) {
                        cb(null, false) 
                    } else cb(null, true);
                })
            },
            (statFile, cb)=>{
                if(statFile) {
                    cb(null)
                } else {
                    mkdir(filePath, cb)
                }
            }
        ], function(err){
            if(err) return reject(err);
            resolve();
        })
    })
}

function preparePath(root, _path){
    return new Promise((resolve, reject)=>{
    
        async.eachSeries(_path.split("/"), (item,cb)=>{
            root = path.join(root, `/${item}`);
            prepareDir(root).then(()=>{cb()}).catch(err=>cb())
        }, function(err){
            if(err) return reject(err);
            resolve(root);
        })
    })
}

function createForm (data, files){  
    let promise = DB.apply_to_join.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        zipcode: data.zipCode
    })
    /* getModels().applyToJoin.create();*/
    if(files && files.length){
        return new Promise((resolve, reject) => {
            promise.then(from=>{
                
                async.eachSeries(files, (item, cb)=>{
                    let uri = `/uploads/forms/${from.id}/`;
                    let filePath = path.join(__dirname, "./public" + uri);
                    preparePath(__dirname, "public/" + uri).then(()=>{
                        item.createReadStream()
                            .pipe(createWriteStream(filePath + "/" + item.filename))
                            .on('error', error => cb(error))
                            .on('finish', () =>{
                                DB.apply_to_join_files.create({
                                    form_id: from.id,
                                    name: item.filename,
                                    path: "/static" + uri + item.filename
                                }).then(file=>cb()).catch(err=>cb(err))
                            })
                        }).catch((err)=>{
                            cb(err);
                        })
                }, function(err){
                    if(err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                })
            }).catch(err=>{
                reject(err)
            })
        });
    }else {
         return promise;
    }
}

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
    Mutation: {
        applyToJoin(parent, args) {


            return new Promise((resolve, reject)=>{
                let files = [];
                if(args.data.attachments.length) {
                    async.forEachOf(args.data.attachments,(item, key, cb)=>{
                        item.then((res)=>{
                            
                            files.push(res);
                            cb()
                        }).catch(err=>cb(err))
                    }, function(err){
                        if(err){
                            reject(err);
                        } else {
                            createForm(args.data, files).then(()=>{
                                resolve({message: "success"})
                            }).catch(err=>reject(err));
                        }
                    })
                }else  {
                    createForm(args.data).then(form=>{                        
                        resolve( {message: "success"});
                    })
                }
            })
        }
    }
};

module.exports = resolvers;