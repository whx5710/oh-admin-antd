import type {
  BaseFormComponentType,
  ExtendedFormApi,
  FinnFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@finn-core/shared/store';

import FinnUseForm from './finn-use-form.vue';
import { FormApi } from './form-api';

export function useFinnForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: FinnFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: FinnFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(FinnUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'FinnUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
