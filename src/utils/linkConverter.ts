export const convertToAgentLink = (agent: string, originalUrl: string): string => {
  if (!originalUrl) return '';
  const encodedUrl = encodeURIComponent(originalUrl);

  const agentsMap: Record<string, string> = {
    acbuy: `https://www.allchinabuy.com/en/page/buy/?url=${encodedUrl}`,
    hippobuy: `https://hippobuy.com/product/details?url=${encodedUrl}`,
    lovegobuy: `https://lovegobuy.com/product/details?url=${encodedUrl}`,
    cnfans: `https://cnfans.com/product/?url=${encodedUrl}`,
    superbuy: `https://www.superbuy.com/en/page/buy/?url=${encodedUrl}`,
    wegobuy: `https://www.wegobuy.com/en/page/buy?url=${encodedUrl}`,
    cssbuy: `https://www.cssbuy.com/item.html?url=${encodedUrl}`,
    oopbuy: `https://www.oopbuy.com/product?url=${encodedUrl}`,
    sugargoo: `https://www.sugargoo.com/#/home/productDetail?productLink=${encodedUrl}`,
    mulebuy: `https://mulebuy.com/product/?url=${encodedUrl}`,
    litbuy: `https://litbuy.com/product/details?url=${encodedUrl}`,
  };

  return agentsMap[agent.toLowerCase()] || originalUrl;
};
