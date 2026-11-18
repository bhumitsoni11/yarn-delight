import "server-only"
import { getShiprocketConfig } from "@/lib/shipping/shiprocket.client"
import { logger } from "@/lib/security/logger"
import type {
  CreateShipmentInput,
  ShipmentTrackingStatus,
  ShippingRateCalculationInput,
  ShippingRateOption,
} from "@/lib/shipping/types"

export interface IShippingService {
  calculateRates(input: ShippingRateCalculationInput): Promise<ShippingRateOption[]>
  createShipment(input: CreateShipmentInput): Promise<{ trackingId: string; shipmentId: string }>
  trackShipment(trackingId: string): Promise<ShipmentTrackingStatus>
}

/**
 * Server-side Shipping Logistics Service Foundation.
 * Prepared for Shiprocket API integration in Phase 1+.
 */
export class ShiprocketShippingService implements IShippingService {
  async calculateRates(input: ShippingRateCalculationInput): Promise<ShippingRateOption[]> {
    // Validates credentials configuration without executing live HTTP call in Phase 0
    getShiprocketConfig()

    logger.info("Shipping rate calculation initiated", { pincode: input.deliveryPincode })

    // Return empty rate array until live Shiprocket API integration phase
    return []
  }

  async createShipment(
    input: CreateShipmentInput
  ): Promise<{ trackingId: string; shipmentId: string }> {
    getShiprocketConfig()

    logger.info("Shipment creation initiated", { orderId: input.orderId })

    throw new Error("Shipment dispatch execution is not enabled in Phase 0.")
  }

  async trackShipment(trackingId: string): Promise<ShipmentTrackingStatus> {
    getShiprocketConfig()

    return {
      trackingId,
      status: "pending",
      lastUpdated: new Date().toISOString(),
    }
  }
}

export const shippingService: IShippingService = new ShiprocketShippingService()
