import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DocumentRegistryModule", (m) => {
  // This tells Hardhat to deploy our DocumentRegistry contract
  const documentRegistry = m.contract("DocumentRegistry");

  return { documentRegistry };
});