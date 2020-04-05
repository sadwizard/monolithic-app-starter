import * as app from './app';
import * as ui from './ui';
import * as user from './user';
import _map from 'lodash/map';

const storeItems = configureActions({ app, ui, user });

export default storeItems;

function configureActions(batchActions: object): object {
  const actions = {}, states = {};
  _map((Object.keys(batchActions) || []), actionsKey => {
    const item = batchActions[actionsKey];

    if (!item['initialState']) {
      throw new Error(`State in ${actionsKey} module is not defined!`);
    }

    states[actionsKey] = { state: item['initialState'] , methodsKeys: [] };

    _map(Object.keys(item), actionMethodKey => {
      if (actionMethodKey !== 'initialState' || !(/thunk/gi.test(actionMethodKey))) {
        actions[actionMethodKey] = item[actionMethodKey];
        states[actionsKey]['methodsKeys'].push(actionMethodKey)
      }
    })
  })

  return { actions, states }
}
