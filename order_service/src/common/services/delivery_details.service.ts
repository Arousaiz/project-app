import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeliveryDetailsInterface } from 'src/common/interfaces/create_delivery_details.interface';
import { UpdateDeliveryDetailsInterface } from 'src/common/interfaces/update_delivery_details.interface';
import { DeliveryDetails } from 'src/entity/delivery_details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryDetailsService {
  constructor(
    @InjectRepository(DeliveryDetails)
    private deliveryDetailsRepository: Repository<DeliveryDetails>,
  ) {}

  async createDeliveryDetails(
    addressId: number,
    data: CreateDeliveryDetailsInterface,
  ) {
    const deliveryDetails = this.deliveryDetailsRepository.create({
      address: { id: addressId },
      deliveryStatus: data.deliveryStatus,
      deliveryTime: data.deliveryTime,
    });
    return await this.deliveryDetailsRepository.save(deliveryDetails);
  }

  async updateDeliveryDetails(id: number, data: UpdateDeliveryDetailsInterface) {
    const deliveryDetails = await this.deliveryDetailsRepository.findOneBy({
      id,
    });
    if (!deliveryDetails)
      throw new HttpException(
        'Delivery details not found',
        HttpStatus.NOT_FOUND,
      );
    return await this.deliveryDetailsRepository.update(id, {
      deliveryStatus: data.deliveryStatus,
      deliveryTime: data.deliveryTime,
    });
  }
}
