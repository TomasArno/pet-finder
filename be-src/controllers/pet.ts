import { Pet } from "../models";
import { index } from "../libs/algolia";

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

  static async create(petData: PetConfig) {
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

      return pet.dataValues;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllPets() {
    return Pet.findAll();
  }

  static async getById(id: number) {
    return Pet.findByPk(id);
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
