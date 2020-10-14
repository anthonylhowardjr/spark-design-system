/* global it expect describe */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SprkTabs from '../../SprkTabs';
import SprkTabsPanel from './SprkTabsPanel';

Enzyme.configure({ adapter: new Adapter() });

describe('SprkTabsPanel:', () => {
  it('should display a Tab Panel element with the correct base class', () => {
    const wrapper = shallow(
      <SprkTabsPanel tabBtnChildren="Tab 1">Test Content 1</SprkTabsPanel>,
    );
    expect(wrapper.find('.sprk-c-Tabs__content').length).toBe(1);
  });

  it('should add classes when tabPanelAdditionalClasses has a value', () => {
    const wrapper = mount(
      <SprkTabsPanel tabBtnChildren="Tab 1" tabPanelAdditionalClasses="test">
        Test Content 1
      </SprkTabsPanel>,
    );
    expect(wrapper.find('.sprk-c-Tabs__content.test').length).toBe(1);
  });

  it('should prefer tabPanelAdditionalClasses over tabPanelAddClasses', () => {
    const wrapper = mount(
      <SprkTabsPanel
        tabPanelAdditionalClasses="test"
        tabPanelAddClasses="test2"
      >
        Test Content 1
      </SprkTabsPanel>,
    );
    expect(wrapper.find('.sprk-c-Tabs__content.test').length).toBe(1);
    expect(wrapper.find('.sprk-c-Tabs__content.test2').length).toBe(0);
  });

  it(`should focus the corresponding Tab Panel when
    the tab key is pressed`, () => {
    const wrapper = mount(
      <SprkTabs>
        <SprkTabsPanel isDefaultActive tabBtnChildren="Tab 1">
          Test Content 1
        </SprkTabsPanel>
        <SprkTabsPanel tabBtnChildren="Tab 2">Test Content 2</SprkTabsPanel>
      </SprkTabs>,
    );
    // First, tab into the Tab Button area
    wrapper
      .find('div.sprk-c-Tabs__buttons')
      .simulate('keydown', { keyCode: 9 });
    // Second, hit the Tab key to move to the panel
    wrapper
      .find('div.sprk-c-Tabs__buttons')
      .simulate('keydown', { keyCode: 9 });
    const panel = wrapper.find(SprkTabsPanel).first();
    expect(panel.getDOMNode().classList.contains('sprk-u-Display--none')).toBe(
      false,
    );
  });
});
