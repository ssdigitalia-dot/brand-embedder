// Validate the generated adapter instead of inventing a fetch wrapper around a Node listener.
export function getFetchHandler(module, serverPath) {
  const handler = typeof module.default?.fetch === "function" ? module.default : module;
  if (typeof handler.fetch !== "function") {
    throw new Error(
      `O servidor compilado ${serverPath} não expõe fetch(). ` +
      'A exportação FTP exige o preset Nitro "standard"; "node-server" abre uma porta e não exporta esse manipulador. ' +
      "Recompile com a configuração atualizada antes de exportar.",
    );
  }
  return handler;
}