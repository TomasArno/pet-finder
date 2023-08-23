import { Pet } from "../models";
import { index } from "../lib/algolia";

import { PetConfig } from "../interfaces";

export class PetController {
  static async getNearbyPets(lat: string, lng: string) {
    try {
      const { hits } = await index.search("", {
        aroundLatLng: `${lat}, ${lng}`,
        aroundRadius: 10000,
      });

      return hits;
    } catch (error) {
      console.error(error);
    }
  }

  static async getNearbyPetsWithIP() {
    try {
      const { hits } = await index.search("", {
        aroundLatLngViaIP: true,
        aroundRadius: 10000,
      });
      return hits;
    } catch (error) {
      console.error(error);
    }
  }

  static async newLostPet(petData: PetConfig) {
    const { name, lat, lng } = petData;

    let pet;

    try {
      pet = await Pet.create({
        ...petData,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await index.saveObject({
        objectID: pet.get("id"),
        name,
        __geoloc: {
          lat,
          lng,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return pet.dataValues;
  }

  static async getAllPets() {
    return Pet.findAll();
  }

  static async getMyPets(userId: string) {
    const userPets = Pet.findAll({
      where: { userId },
    });
    if (userPets) {
      return userPets;
    } else {
      return "user has no pets";
    }
  }
}
