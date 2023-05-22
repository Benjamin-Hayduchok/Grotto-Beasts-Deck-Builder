const eventBus = {
    on(event, callback) {
      if (typeof document !== 'undefined') document.addEventListener(event, (e) => callback(e.detail), {once: true});
    },
    dispatch(event, data) {
      if (typeof document !== 'undefined') document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
      if (typeof document !== 'undefined') document.removeEventListener(event, callback);
    },
  };
  
  export default eventBus;