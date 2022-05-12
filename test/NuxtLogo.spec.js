import { mount } from '@vue/test-utils'
import NuxtLogo from '@/components/NuxtLogo.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()


  })
  test('is H1 soldo present', () => {
    //test to see if component has h1 tag
    const wrapper = mount(NuxtLogo)
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBeTruthy()
  })

})
