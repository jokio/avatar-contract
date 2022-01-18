// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const AvatarPack = await ethers.getContractFactory("AvatarPack");

  const avatarPack = await AvatarPack.deploy(
    100,
    300,
    3,
    10000,
    "QmdbsoKEVGCV9ojAHGM8mVAMyycmfLAX9Ds6SxaA1NKHJA",
    [30, 30, 5, 1, 50]
  );

  console.log("deploying avatarPack", avatarPack);

  await avatarPack.deployed();

  console.log("AvatarPack contract deployed to:", avatarPack.address);

  await sleep(20000);
  console.log("started verification process");

  await run("verify:verify", {
    address: avatarPack.address,
    constructorArguments: [
      100,
      300,
      3,
      [30, 30, 5, 1, 50],
      "https://jok.land/avatar/packs/default/{1}.json",
    ],
  });

  // await run("verify:verify", {
  //   address: ezeki.address,
  //   constructorArguments: [],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
