import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const holdingsBody = document.getElementById('holdingsBody');
    const searchInput = document.getElementById('searchInput');
    const addAssetForm = document.getElementById('addAssetForm');

    const renderAssets = (assets) => {
        holdingsBody.innerHTML = '';
        assets.forEach(asset => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asset.name} (${asset.ticker})</td>
                <td>${asset.quantity}</td>
                <td>${asset.marketValue}</td>
                <td>${asset.marketPrice}</td>
                <td>${asset.performance}%</td>
                <td>${asset.assetType}</td>
            `;
            holdingsBody.appendChild(row);
        });
    };

    const loadAssets = async () => {
        const assets = await backend.getAllAssets();
        renderAssets(assets);
    };

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query) {
            const searchResults = await backend.searchAssets(query);
            renderAssets(searchResults);
        } else {
            loadAssets();
        }
    });

    addAssetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const ticker = document.getElementById('ticker').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const marketValue = parseFloat(document.getElementById('marketValue').value);
        const marketPrice = parseFloat(document.getElementById('marketPrice').value);
        const performance = parseFloat(document.getElementById('performance').value);
        const assetType = document.getElementById('assetType').value;

        await backend.addAsset(name, ticker, quantity, marketValue, marketPrice, performance, assetType);
        addAssetForm.reset();
        loadAssets();
    });

    loadAssets();
});