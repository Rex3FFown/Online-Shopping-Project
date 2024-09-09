//package com.local.onlineshoppingproject.Services;
//
//import com.local.onlineshoppingproject.Entities.Cart;
//import com.local.onlineshoppingproject.Entities.Customer;
//import com.local.onlineshoppingproject.Entities.Product;
//import com.local.onlineshoppingproject.Repositories.CartRepo;
//import com.local.onlineshoppingproject.Repositories.CustomerRepo;
//import com.local.onlineshoppingproject.Repositories.ProductRepo;
//import org.hibernate.FetchNotFoundException;
//import org.hibernate.annotations.NotFound;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
////import javax.transaction.Transactional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//
//
//@Service
//public class CartService{
//
//    @Autowired
//    private ProductRepo pDao;
//
//    @Autowired
//    private CustomerRepo userDao;
//
//
//
//    @Autowired
//    private CartRepo cartDao;
//
//    @Autowired
//    private CustomerRepo custDao;
//
//
//
//
//    //Method to add the Product and customer in cart
//
//
//    public Cart AddProduct(Cart cart, Integer Productid, Integer customerId) {
//        // TODO Auto-generated method stub\
//
//        Optional<Product> opt=pDao.findById(Productid);
//        Optional<Customer> customer=custDao.findById(customerId);
////		System.out.println(customer.get());
//
//
//
//
////		Optional< Customer> databaseCustomer = custDao.findById(customerId);
//
//
//
//
//
//        if(opt.isPresent()) {
//
//            Product prod=opt.get();
//            Customer cust=customer.get();
//
//
//
//            cart.setCartItem(prod);
//            cart.setCustomerlist(cust);
////			for(Customer cust:customer) {
////				custDao.save(cust);
////			}
//            return cartDao.save(cart);
//        }
//        else {return null;}
//    }
//
//    //Method to view the cart
//
//
//    public List<Cart> ViewAllCart() {
//        // TODO Auto-generated method stub
//        List<Cart> list=cartDao.findAll();
//
//
//        return list;
//    }
//
//
//    //Method to update the Product from cart
////	@Override
////	public Cart UpdateCartProduct(Cart cart) throws ProductNotFoundException {
////		// TODO Auto-generated method stub
////
////		Optional<Cart> opt = cartDao.findById(cart.getCartItemId());
////
////		if (opt.isPresent()) {
////			opt.get();
////			Cart crt = cartDao.save(cart);
////			return crt;
////		} else
////			throw new ProductNotFoundException("Product not found with given id");
////
////	}
////
//
//    //Method to delete the product from cart
//
//
//
//    public String deleteProductfromCart(Integer id) {
//        Optional<Cart> opt = cartDao.findById(id);
//
//        if (opt.isPresent()) {
//            Cart cart = opt.get();
////			System.out.println(prod);
//            cartDao.delete(cart);
//            return "CartProduct is deleted from Cart";
//
//        } else
//            return null;
//
//
//    }
//
//    private Cart cart;
//
//    @Transactional
//    public void deleteAllCart() {
//        // TODO Auto-generated method stub
//        cartDao.deleteAll();
////		return "Cart is empty";
//    }
//
//
//
//
//
//}