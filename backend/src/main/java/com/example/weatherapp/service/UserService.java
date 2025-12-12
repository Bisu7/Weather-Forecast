package com.example.weatherapp.service;

import com.example.weatherapp.model.FavoriteCity;
import com.example.weatherapp.model.User;
import com.example.weatherapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User(username, email, passwordEncoder.encode(password));
        return userRepository.save(user);
    }
    
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    @Transactional
    public FavoriteCity addFavoriteCity(Long userId, String cityName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if city already exists
        boolean exists = user.getFavoriteCities().stream()
                .anyMatch(fc -> fc.getCityName().equalsIgnoreCase(cityName));
        
        if (exists) {
            throw new RuntimeException("City already in favorites");
        }
        
        FavoriteCity favoriteCity = new FavoriteCity(cityName, user);
        user.getFavoriteCities().add(favoriteCity);
        userRepository.save(user);
        
        return favoriteCity;
    }
    
    @Transactional
    public void removeFavoriteCity(Long userId, String cityName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.getFavoriteCities().removeIf(fc -> fc.getCityName().equalsIgnoreCase(cityName));
        userRepository.save(user);
    }
    
    public List<String> getFavoriteCities(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return user.getFavoriteCities().stream()
                .map(FavoriteCity::getCityName)
                .collect(Collectors.toList());
    }
}

