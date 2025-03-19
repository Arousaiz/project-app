import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entity/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressInterface } from '../common/interfaces/create_address.interface';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(data: CreateAddressInterface) {
    const address = this.addressRepository.create({
      city: data.city,
      street: data.street,
      house: data.house,
    });
    return await this.addressRepository.save(address);
  }

  async getAddress(id: number) {
    const address = await this.addressRepository.findOne({ where: { id: id } });
    if (address == null) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }
}
