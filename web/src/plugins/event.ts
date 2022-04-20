import { getCurrentInstance, onUnmounted } from "vue";
type Listener<K extends keyof DocumentEventMap> = (ev: DocumentEventMap[K]) => void;

export const useEvent = () => {
  const events: Array<[string, any]> = [];
  const instance = getCurrentInstance();
  onUnmounted(() => {
    console.log("Remove listener");
    for (const [type, listener] of events) {
      document.removeEventListener(type, listener);
    }
  });

  return {
    addListener: function addListener<K extends keyof DocumentEventMap>(type: K, listener: Listener<K>) {
      console.log("Register listener")
      events.push([type, listener]);
      document.addEventListener(type, (e) => {
        console.log(instance);
        listener(e);
      });
    }
  }
}