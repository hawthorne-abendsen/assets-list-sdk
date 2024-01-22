const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

function setIconUrl(item) {
    if (!item.icon)
        return
    if (urlRegex.test(item.icon))
        item.iconUrl = item.icon
    else
        item.iconUrl = `https://${item.icon}.ipfs.w3s.link`
}

/**
 * @typedef {Object} AssetsListInfo
 * @property {string} name - The name of the asset list.
 * @property {string} desc - The description of the asset list.
 * @property {string} icon - The icon of the asset list.
 * @property {string} iconUrl - The URL of the asset list icon.
 * @property {string} url - The URL of the asset list.
 */

/**
 * @typedef {Object} AssetsList
 * @property {string} name - The name of the asset list.
 * @property {string} provider - The name of the asset list provider.
 * @property {string} description - The description of the asset list.
 * @property {string} version - The version of the asset list.
 * @property {string} feedback - The URL of the asset list feedback form.
 * @property {Asset[]} assets - The assets in the list.
 */

/**
 * @typedef {Object} Asset
 * @property {string} contract - The asset contract. (optional)
 * @property {string} code - The asset code. (optional)
 * @property {string} issuer - The asset issuer. (optional)
 * @property {string} name - The asset name.
 * @property {string} org - The asset organization.
 * @property {string} domain - The asset domain.
 * @property {string} icon - The asset icon.
 * @property {string} iconUrl - The URL of the asset icon.
 * @property {number} decimals - The asset decimals.
 * @property {string} comment - The asset comment.
 */

/**
 * Fetches all assets lists info from the given URL.
 * @param {string} url - The full URL to the assets lists info.
 * @returns {Promise<AssetsListInfo[]>} A promise that resolves to the parsed JSON object.
 */
function fetchAllAssetsLists(url) {
    if (!url)
        throw new Error('URL is required')
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json() // Get the response body as text
        })
        .then(allLists => {
            try {
                for (const list of allLists)
                    setIconUrl(list)
                return allLists
            } catch (error) {
                throw new Error('Failed to parse JSON')
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error)
            throw error
        })
}

/**
 * Fetches the assets list from the given URL.
 * @param {string} url - The full URL to the assets list.
 * @returns {Promise<AssetsList>} A promise that resolves to the parsed JSON object.
 */
function fetchAssetsList(url) {
    if (!url)
        throw new Error('URL is required')
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
        })
        .then(assetsList => {
            try {
                for (const asset of assetsList.assets)
                    setIconUrl(asset)
                return assetsList
            } catch (error) {
                throw new Error('Failed to parse JSON')
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error)
            throw error
        })
}

module.exports = { fetchAllAssetsLists, fetchAssetsList }