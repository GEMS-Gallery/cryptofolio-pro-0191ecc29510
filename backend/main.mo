import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Result "mo:base/Result";

import Array "mo:base/Array";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
    public type Asset = {
        name: Text;
        ticker: Text;
        quantity: Float;
        marketValue: Float;
        marketPrice: Float;
        performance: Float;
        assetType: Text;
    };

    private stable var assetsEntries : [(Text, Asset)] = [];
    private var assets = HashMap.HashMap<Text, Asset>(0, Text.equal, Text.hash);

    private func loadAssets() {
        assets := HashMap.fromIter<Text, Asset>(assetsEntries.vals(), 10, Text.equal, Text.hash);
    };

    system func preupgrade() {
        assetsEntries := Iter.toArray(assets.entries());
    };

    system func postupgrade() {
        loadAssets();
    };

    public func addAsset(name: Text, ticker: Text, quantity: Float, marketValue: Float, marketPrice: Float, performance: Float, assetType: Text) : async () {
        let asset : Asset = {
            name = name;
            ticker = ticker;
            quantity = quantity;
            marketValue = marketValue;
            marketPrice = marketPrice;
            performance = performance;
            assetType = assetType;
        };
        assets.put(ticker, asset);
    };

    public query func getAllAssets() : async [Asset] {
        Iter.toArray(assets.vals())
    };

    public query func searchAssets(searchQuery: Text) : async [Asset] {
        let searchResults = Array.filter<Asset>(Iter.toArray(assets.vals()), func (asset: Asset) : Bool {
            Text.contains(Text.toLowercase(asset.name), #text (Text.toLowercase(searchQuery))) or
            Text.contains(Text.toLowercase(asset.ticker), #text (Text.toLowercase(searchQuery)))
        });
        searchResults
    };

    public func init() : async () {
        loadAssets();
    };
}