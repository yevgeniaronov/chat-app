import { ref, computed } from "vue";
import { upperFirst } from "lodash";
import { apiStatus } from "./consts";
import store from "@/store";
import { TOGGLE_GLOBAL_LOADER } from "@/store/modules/app-shell/consts";

const { IDLE, SUCCESS, PENDING, ERROR } = apiStatus;

/**
 * Create an object of computed statuses
 *
 * @param {Symbol} status
 * @param {String} apiName
 */
const createNormalisedApiStatuses = (status, apiName) => {
  let normalisedApiStatuses = {};

  for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
    let propertyName = "";
    // Create a property name for each computed status
    if (apiName) {
      propertyName = `${apiName}Status${upperFirst(statusKey.toLowerCase())}`;
    } else {
      propertyName = `status${statusKey.toLowerCase()}`;
    }

    // Create a computed that returns true/false based on
    // the currently selected status
    normalisedApiStatuses[propertyName] = computed(
      () => statusValue === status.value
    );
  }

  return normalisedApiStatuses;
};

/**
 * @param {string} apiName
 * @param {function} fn
 * @param {object} config
 */
export const useApi = (apiName, fn, config = {}) => {
  const { initialData, responseAdapter, globalLoader = false } = config;
  // Reactive values to store data and API status
  const data = ref(initialData);
  const status = ref(IDLE);
  const error = ref(null);

  /**
   * Initialise the api request
   */

  // add delay to see loader in action
  // eslint-disable-next-line no-unused-vars
  const delay = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
  };
  const exec = async (...args) => {
    if (globalLoader) store.commit(TOGGLE_GLOBAL_LOADER, true);
    // await delay();
    try {
      status.value = PENDING;
      const response = await fn(...args);
      data.value =
        typeof responseAdapter === "function"
          ? responseAdapter(response)
          : response;
      status.value = SUCCESS;
    } catch (error) {
      error.value = error;
      status.value = ERROR;
      if (globalLoader) store.commit(TOGGLE_GLOBAL_LOADER, false);
    } finally {
      if (globalLoader) store.commit(TOGGLE_GLOBAL_LOADER, false);
    }
  };

  const setStatus = (nextStatus) => (status.value = nextStatus);

  return {
    data,
    status,
    error,
    exec,
    setStatus,
    ...createNormalisedApiStatuses(status, apiName),
  };
};
