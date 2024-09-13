export const idlFactory = ({ IDL }) => {
  const Asset = IDL.Record({
    'marketValue' : IDL.Float64,
    'name' : IDL.Text,
    'performance' : IDL.Float64,
    'quantity' : IDL.Float64,
    'assetType' : IDL.Text,
    'marketPrice' : IDL.Float64,
  });
  return IDL.Service({
    'addAsset' : IDL.Func(
        [
          IDL.Text,
          IDL.Float64,
          IDL.Float64,
          IDL.Float64,
          IDL.Float64,
          IDL.Text,
        ],
        [],
        [],
      ),
    'getAllAssets' : IDL.Func([], [IDL.Vec(Asset)], []),
    'init' : IDL.Func([], [], []),
    'searchAssets' : IDL.Func([IDL.Text], [IDL.Vec(Asset)], []),
  });
};
export const init = ({ IDL }) => { return []; };
