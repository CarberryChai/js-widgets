const EventManager = {
    eventList: new Map(),

    on(event, callback){
        this.eventList.has(event) || this.eventList.set(event, []);
        this.eventList.get(event).push(callback)
        return this;
    },

    emit(event, ...args){
        if (this.eventList.has(event) === false) {
            return 
        }
        this.eventList.get(event).forEach(cb => {
            setTimeout(() => { cb(...args)}, 0)
        });
    },

    off(event = null){
        this.eventList.delete(event)
    }
}
export default EventManager;