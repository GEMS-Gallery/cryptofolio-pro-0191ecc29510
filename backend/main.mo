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
    // Define the Asset type
    public type Asset = {
        name: Text;
        quantity: Float;
        marketValue: Float;
        marketPrice: Float;
        performance: Float;
        assetType: Text;
    };

    // Create a stable variable to store assets
    private stable var assetsEntries : [(Text, Asset)] = [];
    private var assets = HashMap.HashMap<Text, Asset>(0, Text.equal, Text.hash);

    // Initialize the assets HashMap from stable storage
    private func loadAssets() {
        assets := HashMap.fromIter<Text, Asset>(assetsEntries.vals(), 10, Text.equal, Text.hash);
    };

    // Save assets to stable storage before upgrades
    system func preupgrade() {
        assetsEntries := Iter.toArray(assets.entries());
    };

    // Reload assets after upgrades
    system func postupgrade() {
        loadAssets();
    };

    // Add a new asset
    public func addAsset(name: Text, quantity: Float, marketValue: Float, marketPrice: Float, performance: Float, assetType: Text) : async () {
        let asset : Asset = {
            name = name;
            quantity = quantity;
            marketValue = marketValue;
            marketPrice = marketPrice;
            performance = performance;
            assetType = assetType;
        };
        assets.put(name, asset);
    };

    // Get all assets
    public func getAllAssets() : async [Asset] {
        Iter.toArray(assets.vals())
    };

    // Search assets by name
    public func searchAssets(searchQuery: Text) : async [Asset] {
        let searchResults = Array.filter<Asset>(Iter.toArray(assets.vals()), func (asset: Asset) : Bool {
            Text.contains(Text.toLowercase(asset.name), #text (Text.toLowercase(searchQuery)))
        });
        searchResults
    };

    // Initialize the canister
    public func init() : async () {
        loadAssets();
    };
}