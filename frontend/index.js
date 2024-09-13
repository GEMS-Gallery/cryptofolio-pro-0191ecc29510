import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const holdingsBody = document.getElementById('holdingsBody');
    const searchInput = document.getElementById('searchInput');
    const addAssetForm = document.getElementById('addAssetForm');

    // Function to render assets in the table
    const renderAssets = (assets) => {
        holdingsBody.innerHTML = '';
        assets.forEach(asset => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asset.name}</td>
                <td>${asset.quantity}</td>
                <td>${asset.marketValue}</td>
                <td>${asset.marketPrice}</td>
                <td>${asset.performance}%</td>
                <td>${asset.assetType}</td>
            `;
            holdingsBody.appendChild(row);
        });
    };

    // Load all assets on page load
    const loadAssets = async () => {
        const assets = await backend.getAllAssets();
        renderAssets(assets);
    };

    // Search assets
    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query) {
            const searchResults = await backend.searchAssets(query);
            renderAssets(searchResults);
        } else {
            loadAssets();
        }
    });

    // Add new asset
    addAssetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const marketValue = parseFloat(document.getElementById('marketValue').value);
        const marketPrice = parseFloat(document.getElementById('marketPrice').value);
        const performance = parseFloat(document.getElementById('performance').value);
        const assetType = document.getElementById('assetType').value;

        await backend.addAsset(name, quantity, marketValue, marketPrice, performance, assetType);
        addAssetForm.reset();
        loadAssets();
    });

    // Initial load of assets
    loadAssets();
});