// Импорт всех svg из папки в sprite
const req = require.context("../../images/_svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
