package com.example.websocket.init;

import com.example.websocket.model.BizUser;
import com.example.websocket.model.NgoUser;
import com.example.websocket.model.Role;
import com.example.websocket.model.VolunteerUser;
import com.example.websocket.model.enums.CompanySize;
import com.example.websocket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public final class DatabaseInitializer implements CommandLineRunner {
    private final UserRepository userRepository;

    private String[] ngoStrategies = new String[]{"Increasing public awareness of environmental issues",
            "Supporting local communities through education and training",
            "Building partnerships with other NGOs and public institutions",
            "Executing fundraising campaigns and securing donors"};

    private String[] ngoProjects = new String[]{"Eco-School Project: Environmental education for children in local schools",
            "Healthy Community Initiative: A healthy lifestyle program for seniors",
            "Fight Against Poverty: Support program for families in financial difficulty",
            "Park Revitalization: Restoring public spaces in urban areas"};

    private String[] ngoProjectExperience = new String[]{"5 years of experience in managing educational projects for children and youth.",
            "3 years of humanitarian work in crisis-affected areas.",
            "Managed a team of volunteers for social projects for 4 years.",
            "Coordinated fundraising campaigns that raised over $1 million in donations."};

    private String[] ngoSocialGoals = new String[]{"Reducing poverty in local communities through support programs.",
            "Increasing access to education for children from low-income families.",
            "Promoting healthy lifestyles and physical activity among seniors.",
            "Protecting the environment and raising ecological awareness among residents."};

    private String[] bizStrategies = new String[]{"Collaborate with NGOs to enhance community impact through joint projects",
            "Leverage corporate resources to support local NGOs in achieving their goals",
            "Create awareness campaigns in partnership with NGOs to address social issues",
            "Implement employee volunteer programs that align with NGO missions"};

    private String[] bizSocialGoals = new String[]{"Promote educational opportunities for underprivileged children through NGO partnerships",
            "Support sustainable development initiatives led by local NGOs",
            "Enhance mental health resources in collaboration with community health NGOs",
            "Foster economic empowerment through skills training programs with NGOs"};

    private String[] bizPartners = new String[]{
            "Community Education Foundation, Local Health NGOs, Environmental Conservation Groups",
            "Youth Development Organization, Women's Empowerment NGOs",
            "Sustainable Agriculture Network, Local Arts and Culture NGOs",
            "Disaster Relief Fund, Global Health Initiatives"
    };

    private String[] bizGrants = new String[]{
            "$50,000 for community health outreach programs",
            "$30,000 for educational resource development in collaboration with NGOs",
            "$25,000 for environmental sustainability projects",
            "$15,000 for vocational training initiatives with local NGOs"
    };

    private CompanySize[] bizCompanySize = CompanySize.values();

    private BigDecimal[] bizBudgets = new BigDecimal[]{
            new BigDecimal("200000.00"),
            new BigDecimal("300000.00"),
            new BigDecimal("150000.00"),
            new BigDecimal("100000.00")
    };

    @Override
    public void run(String... args) throws Exception {
        for (int i = 0; i < 3; i++) {
            BizUser biz = new BizUser();
            biz.setName("Biz User" + i);
            biz.setEmail("biz" + i + "@example.com");
            biz.setPassword("biz");
            biz.setRole(Role.BUSINESS);
            biz.setStrategies(bizStrategies[i]);
            biz.setSocialGoals(bizSocialGoals[i]);
            biz.setCompanySize(bizCompanySize[i]);
            biz.setBudget(bizBudgets[i]);
            biz.setGrants(bizGrants[i]);
            biz.setPartners(bizPartners[i]);

            NgoUser ngo = new NgoUser();
            ngo.setName("Ngo User" + i);
            ngo.setEmail("ngo" + i + "@example.com");
            ngo.setPassword("ngo");
            ngo.setRole(Role.NGO);
            ngo.setStrategies(ngoStrategies[i]);
            ngo.setProjects(ngoProjects[i]);
            ngo.setProjectExperience(ngoProjectExperience[i]);
            ngo.setSocialGoals(ngoSocialGoals[i]);

            VolunteerUser vol = new VolunteerUser();
            vol.setName("vol User" + i);
            vol.setEmail("vol" + i + "@example.com");
            vol.setPassword("vol");
            vol.setRole(Role.VOLUNTEER);

            userRepository.save(biz);
            userRepository.save(ngo);
            userRepository.save(vol);
        }
    }
}
