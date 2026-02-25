import { Router } from "express";
import { customerService } from "./customer.service";
import { CreateCustomerRequest } from "./customer.types";

export const customerRouter = Router();

customerRouter.post("/", (req, res, next) => {
  try {
    const { name, email } = req.body as CreateCustomerRequest;
    const customer = customerService.createCustomer(name, email);
    res.json(customer);
  } catch (err) {
    next(err);
  }
});

customerRouter.get("/:id", (req, res, next) => {
  try {
    const customer = customerService.getCustomer(req.params.id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
});
