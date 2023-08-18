import { Interface } from '@ethersproject/abi'
import IMMUTABLE_ODDS_ABI from './immutable-odds-abi.json'

const IMMUTABLE_ODDS_INTERFACE = new Interface(IMMUTABLE_ODDS_ABI)

export default IMMUTABLE_ODDS_INTERFACE
export { IMMUTABLE_ODDS_ABI }
