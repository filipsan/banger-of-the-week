function resolvePromise(promise, promiseState){
  console.log(promiseState)
  if(promiseState.promise && !promiseState.data && !promiseState.error){
    cancelPromise(promiseState.promise)
  }
  if(!promise){return;}

  promiseState.promise=promise;
  promiseState.data={};
  promiseState.error=null

  function saveDataACB(result){
    if(promiseState.promise!==promise){return;}
      promiseState.data={...promiseState.data,...{"data": result}}
      promiseState.promise = null


  }
  function saveErrorACB(err){
    if(promiseState.promise!==promise){return;}

      promiseState.promise=null
      promiseState.error=err;

  }
  if(promise){
    promise.then(saveDataACB).catch(saveErrorACB)
  }
}


function cancelPromise(promise){
  let controller = new AbortController()
  const signal = controller.signal
  fetch(promise, {signal})
    .then(function(response){
      console.log(response)
    }).catch(function(e){
      console.log(e)
    })
  // if(promiseState.promise && !promiseState.data && !promiseState.error){
  //   controller.abort(promiseState.promise)
  }

export default resolvePromise;
