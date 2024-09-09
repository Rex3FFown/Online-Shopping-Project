//package com.local.onlineshoppingproject.Controllers;
//
//import com.local.onlineshoppingproject.Entities.Cart;
//import com.local.onlineshoppingproject.Repositories.CartRepo;
//import com.local.onlineshoppingproject.Services.CartService;
//import lombok.NoArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.*;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/Cart")
//@NoArgsConstructor
//public class CartController {
//
//@Autowired
//    private CartService cartService;
//
//@Autowired
//    private CartRepo cDao;
//
//
//
//    @PostMapping("/addtocart/{id}/{custId}")
//    public ResponseEntity<Cart>addorder(@RequestBody Cart cart,@PathVariable Integer id,@PathVariable Integer custId){
//        Cart uporder= cartService.AddProduct(cart, id, custId);
//        return new ResponseEntity<Cart>(uporder,HttpStatus.ACCEPTED);
//    }
//
//    //To delete the cart data
//
//    @DeleteMapping(value = "/cart/{id}")
//    public ResponseEntity<String> removeCartProduct(@PathVariable("id") Integer id){
//
//        String res = cartService.deleteProductfromCart(id);
//        return new ResponseEntity<String>(res,HttpStatus.OK);
//    }
//
//
//    //To view the cart data;
//
//    @GetMapping("/cart")
//    public ResponseEntity<List<Cart>> getAllProductsHandler() {
//
//        List<Cart> list = cartService.ViewAllCart();
//
//        return new ResponseEntity<List<Cart>>(list, HttpStatus.OK);
//    }
//
//    //To update the cart data
//
//    //	@PutMapping("/carts")
////	public ResponseEntity<Cart> updateProductInCatalogHandler(@RequestBody Cart cart) {
////
////		Cart cart1=cartService.UpdateCartProduct(cart);
////
////		return new ResponseEntity<Cart>(cart1, HttpStatus.OK);
////
////	}
////
//    @DeleteMapping(value = "/cart/clear")
//    public String clearCartHandler(){
//        cartService.deleteAllCart();
//        String res="Cart is empty Now";
//        return res;
//
//    }
////
//
//}