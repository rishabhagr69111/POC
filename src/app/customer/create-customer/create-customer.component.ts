import { Component, OnInit } from '@angular/core';
 
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Employee } from '../Employee';
 
@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
 
  customer : Customer = new Customer();
  employee : Employee = new Employee();
  submitted = false;
 
  constructor(private customerService: CustomerService) { }
 
  ngOnInit() {
  }
 
  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
    this.employee= new Employee();
  }
 
  save() {
    this.customerService.createCustomer(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.customer = new Customer();
    this.employee=new Employee();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}