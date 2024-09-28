package com.example.websocket.init;

import com.example.websocket.model.*;
import com.example.websocket.model.enums.CompanySize;
import com.example.websocket.repository.ChatMessageRepository;
import com.example.websocket.repository.SwipeRepository;
import com.example.websocket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public final class DatabaseInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final SwipeRepository swipeRepository;
    private final ChatMessageRepository chatMessageRepository;

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

    private List<Long> messageSenderIds = List.of(0L, 1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L);

    private List<Long> messageReceiverIds = new ArrayList<>(Arrays.asList(0L, 1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L));

    private List<String> messageContents = Arrays.asList(
            "siemanko, co tam?",
            "poklikamy?",
            "przyswirujmy",
            "bedzie co?",
            "lądujemy?",
            "witamy się z gąską?",
            "fajne NGO wariacie"
    );

    private LocalDateTime dateTime = LocalDateTime.now();

    private List<Boolean> messagesAreRead = List.of(false, true);


    @Override
    public void run(String... args) throws Exception {
        generateUsers();
        generateMessages();
    }

    private void generateUsers() {
        for (int i = 0; i < 3; i++) {
            BizUser biz = new BizUser();
            biz.setName("Biz User" + i);
            biz.setEmail("biz" + i + "@example.com");
            biz.setPassword("biz");
            biz.setDescription("bizDescription");
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
            ngo.setDescription("ngoDescription");
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
            vol.setDescription("volDescription");

            userRepository.save(biz);
            userRepository.save(ngo);
            userRepository.save(vol);

            //match generation
            if (i == 1) {
                generateBizNgoMatch(biz, ngo);
                generateNgoVolunteerMatch(ngo, vol);
            }
        }
    }

    private void generateBizNgoMatch(BizUser biz, NgoUser ngo) {
        Swipe swipeBizNgo = new Swipe();
        swipeBizNgo.setUserId(biz.getId());
        swipeBizNgo.setPartnerId(ngo.getId());
        swipeBizNgo.setSwipeStatus(true);
        swipeRepository.save(swipeBizNgo);
    }

    private void generateNgoVolunteerMatch(NgoUser ngo, VolunteerUser vol) {
        Swipe swipeNgoVol = new Swipe();
        swipeNgoVol.setUserId(ngo.getId());
        swipeNgoVol.setPartnerId(vol.getId());
        swipeNgoVol.setSwipeStatus(true);
        swipeRepository.save(swipeNgoVol);
    }

    private void generateMessages() {
        for (int i = 0; i < 300; i++) {
            ChatMessage message = new ChatMessage();
            message.setId((long) i);
            message.setRead(getRandomValue(messagesAreRead));
            message.setContent(getRandomValue(messageContents));
            message.setSenderId(getRandomValue(messageSenderIds));
            messageReceiverIds.remove(message.getSenderId());
            message.setReceiverId(getRandomValue(messageReceiverIds));
            messageReceiverIds.add(message.getSenderId());
            message.setTimestamp(dateTime);
            chatMessageRepository.save(message);
        }
    }

    public static <T> T getRandomValue(List<T> list) {
        Random random = new Random();
        int randomIndex = random.nextInt(list.size());
        return list.get(randomIndex);
    }

}
