import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Asset {
  'marketValue' : number,
  'name' : string,
  'performance' : number,
  'quantity' : number,
  'assetType' : string,
  'marketPrice' : number,
}
export interface _SERVICE {
  'addAsset' : ActorMethod<
    [string, number, number, number, number, string],
    undefined
  >,
  'getAllAssets' : ActorMethod<[], Array<Asset>>,
  'init' : ActorMethod<[], undefined>,
  'searchAssets' : ActorMethod<[string], Array<Asset>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
