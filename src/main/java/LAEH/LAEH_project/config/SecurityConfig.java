package LAEH.LAEH_project.config;


import LAEH.LAEH_project.exception.MyAccessDeniedHandler;
import LAEH.LAEH_project.exception.MyAuthenticationEntryPoint;
import LAEH.LAEH_project.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailService userDetailService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeRequests(auth -> auth
                        .requestMatchers(
                                new AntPathRequestMatcher("/user/login"),
                                new AntPathRequestMatcher("/user/signup"),
                                new AntPathRequestMatcher("/user/**"),
                                new AntPathRequestMatcher("/teacher/**"),
                                new AntPathRequestMatcher("/contents/**"),
                                new AntPathRequestMatcher("/count/**"),
                                new AntPathRequestMatcher("/subscribe/**"),
                                new AntPathRequestMatcher("/cart/**"),
                                new AntPathRequestMatcher("/video/**"),
                                new AntPathRequestMatcher("/lecture/**"),

                                new AntPathRequestMatcher("/memo/**"),

                                new AntPathRequestMatcher("/login"),
                                new AntPathRequestMatcher("/user/current"),
                                new AntPathRequestMatcher("/LAEH_project/**"),
                                new AntPathRequestMatcher("/cal/**"),

                                new AntPathRequestMatcher("/js/**"),
                                new AntPathRequestMatcher("/css/**"),
                                new AntPathRequestMatcher("/image/**"),
                                new AntPathRequestMatcher("/mp4/**"),

                                new AntPathRequestMatcher("/post/**"), //진경
                                new AntPathRequestMatcher("/board/**"), //진경
                                new AntPathRequestMatcher("/freeBoard/**"), //진경
                                new AntPathRequestMatcher("/eventPage/**"), //진경
                                new AntPathRequestMatcher("/boardRead/**"), //진경
                                new AntPathRequestMatcher("/boardEdit/**"), //진경
                                new AntPathRequestMatcher("/postId/**") ,
                                new AntPathRequestMatcher("/edit/**")



                        ).permitAll()
                        .anyRequest().authenticated())
                .formLogin(form->form.loginPage("/login").defaultSuccessUrl("/articles"))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new MyAuthenticationEntryPoint())
                        .accessDeniedHandler(new MyAccessDeniedHandler()))
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http,
                                                       BCryptPasswordEncoder bCryptPasswordEncoder,
                                                       UserDetailService userDetailService) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return new ProviderManager(authProvider);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}