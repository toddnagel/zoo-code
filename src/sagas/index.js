import { all, fork } from 'redux-saga/effects'

import testSaga from './testSaga/saga'
import animalSaga from './animalSaga/saga'

export default function* root() {
  yield all([fork(testSaga)]);
  yield all([fork(animalSaga)]);
}
