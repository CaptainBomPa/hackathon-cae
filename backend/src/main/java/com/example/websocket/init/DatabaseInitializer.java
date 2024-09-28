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
        createNgoUsers();
        createBizUsers();
        createVolunteerUsers();

        // You can add more data creation methods here in the future
        generateMessages();
    }

    private void createNgoUsers() {
        // Environmental NGOs
        userRepository.save(createNgoUser("Eco Sustainability Initiative",
                "Promoting renewable energy adoption in communities.",
                "Urban tree planting initiative to combat air pollution.",
                "4 years of managing sustainable energy workshops.",
                "Enhance community awareness of ecological issues.",
                "Dedicated to creating a sustainable future through innovative practices."));

        userRepository.save(createNgoUser("Clean Oceans Project",
                "Collaborating with local organizations to reduce plastic waste.",
                "Coastal cleanup events and marine life protection programs.",
                "3 years organizing beach cleanups that removed tons of plastic.",
                "Promote ocean conservation and reduce marine pollution.",
                "Focused on protecting marine ecosystems and promoting clean oceans."));

        userRepository.save(createNgoUser("Green Cities Alliance",
                "Partnering with urban planners to create green spaces.",
                "City park revitalization projects to increase biodiversity.",
                "5 years enhancing urban environments through greenery.",
                "Improve urban biodiversity and community health.",
                "Striving to make cities greener and more livable for all residents."));

        userRepository.save(createNgoUser("Wildlife Conservation Network",
                "Focusing on habitat preservation and anti-poaching efforts.",
                "Endangered species recovery programs and wildlife sanctuaries.",
                "6 years of working on species conservation projects.",
                "Protect endangered species and their habitats.",
                "Committed to preserving wildlife and promoting biodiversity worldwide."));

        userRepository.save(createNgoUser("Climate Change Action Group",
                "Advocating for policy changes on climate action.",
                "Educational campaigns on climate resilience.",
                "4 years influencing local climate policy.",
                "Raise awareness and advocate for effective climate policies.",
                "Dedicated to fighting climate change through community engagement and policy advocacy."));

        // Health NGOs
        userRepository.save(createNgoUser("Healthy Living Initiative",
                "Promoting nutrition education in schools.",
                "Healthy eating workshops for families.",
                "3 years improving nutritional knowledge in communities.",
                "Foster healthy lifestyles through education.",
                "Focused on enhancing community health through education and awareness."));

        userRepository.save(createNgoUser("Mental Health Matters",
                "Raising awareness on mental health issues.",
                "Support groups for mental health awareness.",
                "5 years facilitating workshops on mental health.",
                "Reduce stigma surrounding mental health.",
                "Dedicated to supporting mental well-being in communities through education and outreach."));

        userRepository.save(createNgoUser("Community Health Outreach",
                "Providing free health screenings in underserved areas.",
                "Vaccination drives and health fairs.",
                "4 years conducting health outreach programs.",
                "Improve access to healthcare for all.",
                "Aiming to bridge the gap in healthcare access for marginalized populations."));

        userRepository.save(createNgoUser("Youth Wellness Network",
                "Promoting physical activity among youth.",
                "After-school sports programs and wellness retreats.",
                "3 years encouraging healthy lifestyles in schools.",
                "Foster healthy habits in young people.",
                "Committed to inspiring the next generation to lead active, healthy lives."));

        userRepository.save(createNgoUser("Global Health Initiative",
                "Collaborating with international organizations for health education.",
                "Global vaccination campaigns and health training programs.",
                "6 years enhancing global health initiatives.",
                "Improve health outcomes worldwide.",
                "Dedicated to improving health standards in underserved communities globally."));

        // Education NGOs
        userRepository.save(createNgoUser("Literacy for All",
                "Providing access to reading materials for underserved communities.",
                "Community reading programs to enhance literacy skills.",
                "4 years improving literacy rates through targeted initiatives.",
                "Ensure access to education for all individuals.",
                "Focused on eradicating illiteracy and promoting reading culture in communities."));

        userRepository.save(createNgoUser("STEM Empowerment Initiative",
                "Encouraging STEM education through workshops and scholarships.",
                "STEM camps for youth to inspire future careers.",
                "5 years enhancing student interest in STEM fields.",
                "Promote education in science, technology, engineering, and math.",
                "Dedicated to empowering the next generation of innovators and leaders."));

        userRepository.save(createNgoUser("Global Education Fund",
                "Partnering with schools to enhance educational resources.",
                "Building libraries and computer labs in underserved areas.",
                "6 years providing educational resources globally.",
                "Improve educational access and quality worldwide.",
                "Aiming to create equitable access to education for all children globally."));

        userRepository.save(createNgoUser("Youth Leadership Academy",
                "Providing leadership training for young adults.",
                "Workshops focused on developing leadership skills.",
                "3 years empowering youth through leadership initiatives.",
                "Foster leadership skills in the next generation.",
                "Committed to nurturing young leaders who will drive positive change."));

        userRepository.save(createNgoUser("Community Skill Development",
                "Offering vocational training to enhance job readiness.",
                "Skill workshops aimed at youth and adults.",
                "4 years providing skill development training.",
                "Improve employment opportunities through education.",
                "Focused on equipping individuals with the skills needed for today’s job market."));
    }

    private void createBizUsers() {
        // Business users supporting environmental NGOs
        userRepository.save(createBizUser("GreenTech Solutions",
                "Partnering with NGOs to implement renewable energy solutions.",
                "EcoPartners, Renewable Energy Corp.",
                new BigDecimal("500000.00"),
                CompanySize.LOCAL,
                "Committed to sustainable development and community impact."));

        userRepository.save(createBizUser("Eco-Friendly Innovations",
                "Collaborating with NGOs to create sustainable products.",
                "Sustainability Partners, Green Products Inc.",
                new BigDecimal("350000.00"),
                CompanySize.REGIONAL,
                "Innovating for a greener future through community engagement."));

        userRepository.save(createBizUser("Urban Sustainability Group",
                "Working with NGOs to enhance urban green spaces.",
                "Green Cities Alliance, Urban Development Org.",
                new BigDecimal("600000.00"),
                CompanySize.NATIONAL,
                "Fostering sustainable living through community projects."));

        userRepository.save(createBizUser("Conserve Our Oceans",
                "Teaming up with NGOs for marine conservation initiatives.",
                "Marine Protection Coalition, Ocean Guardians.",
                new BigDecimal("400000.00"),
                CompanySize.REGIONAL,
                "Dedicated to preserving marine ecosystems for future generations."));

        userRepository.save(createBizUser("Sustainable Agriculture Corp",
                "Partnering with NGOs to promote sustainable farming practices.",
                "Agriculture for All, Local Food Initiatives.",
                new BigDecimal("450000.00"),
                CompanySize.LOCAL,
                "Committed to improving food security and environmental sustainability."));

        // Business users supporting health NGOs
        userRepository.save(createBizUser("HealthTech Innovations",
                "Providing tech solutions for health awareness NGOs.",
                "Community Health Partners, Health Advocates.",
                new BigDecimal("300000.00"),
                CompanySize.NATIONAL,
                "Innovating healthcare solutions for underserved populations."));

        userRepository.save(createBizUser("Wellness Group Inc.",
                "Promoting mental health awareness with NGOs.",
                "Mental Health Allies, Wellbeing Foundation.",
                new BigDecimal("200000.00"),
                CompanySize.REGIONAL,
                "Dedicated to promoting mental health and community support."));

        userRepository.save(createBizUser("Healthy Communities Network",
                "Supporting health initiatives through corporate responsibility.",
                "Local Health NGOs, Wellness Coalition.",
                new BigDecimal("500000.00"),
                CompanySize.NATIONAL,
                "Enhancing community health through partnerships."));

        userRepository.save(createBizUser("Youth Wellness Initiative",
                "Creating programs for youth health in collaboration with NGOs.",
                "Youth Health Alliance, Community Wellness Org.",
                new BigDecimal("350000.00"),
                CompanySize.LOCAL,
                "Focused on empowering youth through health education."));

        userRepository.save(createBizUser("Global Health Solutions",
                "Partnering with NGOs to improve global health outcomes.",
                "International Health Network, Global Health Fund.",
                new BigDecimal("600000.00"),
                CompanySize.NATIONAL,
                "Committed to global health improvements through collaboration."));

        // Business users supporting education NGOs
        userRepository.save(createBizUser("Future Leaders Academy",
                "Providing scholarships in partnership with NGOs.",
                "Education for All, Youth Empowerment Org.",
                new BigDecimal("250000.00"),
                CompanySize.REGIONAL,
                "Investing in education to empower the next generation."));

        userRepository.save(createBizUser("TechEd Solutions",
                "Offering technology resources for educational NGOs.",
                "STEM Educators, Digital Learning NGOs.",
                new BigDecimal("300000.00"),
                CompanySize.NATIONAL,
                "Enhancing educational opportunities through technology."));

        userRepository.save(createBizUser("Community Learning Initiative",
                "Supporting adult education programs with NGOs.",
                "Lifelong Learning NGOs, Community Colleges.",
                new BigDecimal("400000.00"),
                CompanySize.LOCAL,
                "Committed to lifelong learning and skill development."));

        userRepository.save(createBizUser("Global Literacy Network",
                "Partnering with NGOs to improve literacy rates worldwide.",
                "Literacy Advocates, Educational Reform NGOs.",
                new BigDecimal("500000.00"),
                CompanySize.REGIONAL,
                "Focused on eradicating illiteracy globally through partnerships."));

        userRepository.save(createBizUser("Youth Empowerment Foundation",
                "Fostering leadership skills with NGOs.",
                "Leadership Development NGOs, Youth Advocacy Groups.",
                new BigDecimal("350000.00"),
                CompanySize.REGIONAL,
                "Investing in youth to drive positive change in communities."));
    }

    private void createVolunteerUsers() {
        // Volunteers interested in environmental NGOs
        userRepository.save(createVolunteerUser("John", "Doe",
                "Hiking, Photography",
                "3 years of volunteering with environmental NGOs",
                "Support wildlife conservation efforts.",
                "A passionate volunteer eager to contribute to environmental missions and protect nature."));

        userRepository.save(createVolunteerUser("Jane", "Smith",
                "Gardening, Community Service",
                "2 years of experience in urban greening projects",
                "Promote sustainable living and community gardens.",
                "Dedicated to enhancing green spaces in urban areas."));

        userRepository.save(createVolunteerUser("Emily", "Johnson",
                "Recycling, Awareness Campaigns",
                "1 year of experience in waste reduction initiatives",
                "Advocate for recycling programs in schools.",
                "Eager to educate others about environmental sustainability."));

        userRepository.save(createVolunteerUser("Michael", "Williams",
                "Cycling, Fundraising",
                "4 years of fundraising for conservation efforts",
                "Support marine conservation projects.",
                "Passionate about cycling events that benefit environmental causes."));

        userRepository.save(createVolunteerUser("Sarah", "Brown",
                "Nature Walks, Education",
                "3 years of experience in environmental education programs",
                "Inspire youth to connect with nature.",
                "Focused on empowering the next generation of environmental stewards."));

        // Volunteers interested in health NGOs
        userRepository.save(createVolunteerUser("Chris", "Davis",
                "Fitness, Mental Health Awareness",
                "2 years of volunteering in mental health campaigns",
                "Promote mental wellness in the community.",
                "Committed to reducing stigma around mental health issues."));

        userRepository.save(createVolunteerUser("Lisa", "Garcia",
                "Nutrition, Health Workshops",
                "1 year of experience conducting health workshops",
                "Support local health initiatives.",
                "Passionate about educating communities on nutrition and wellness."));

        userRepository.save(createVolunteerUser("David", "Martinez",
                "Running, Community Health",
                "3 years of volunteering in community health initiatives",
                "Engage in outreach for preventive healthcare.",
                "Dedicated to making health resources accessible to everyone."));

        userRepository.save(createVolunteerUser("Jessica", "Hernandez",
                "Yoga, Wellness",
                "2 years of experience in wellness coaching",
                "Collaborate with health NGOs for community wellness.",
                "Aims to inspire holistic health practices in underserved communities."));

        userRepository.save(createVolunteerUser("Robert", "Wilson",
                "Cooking, Nutrition",
                "4 years of experience in nutrition education",
                "Support food security programs.",
                "Loves to teach cooking classes that focus on healthy eating."));

        // Volunteers interested in education NGOs
        userRepository.save(createVolunteerUser("Angela", "Moore",
                "Reading, Mentoring",
                "2 years of tutoring experience",
                "Enhance literacy rates among children.",
                "Eager to support educational initiatives in local schools."));

        userRepository.save(createVolunteerUser("Daniel", "Taylor",
                "Art, Teaching",
                "3 years of experience in art education programs",
                "Foster creativity in youth through arts education.",
                "Believes that art can transform lives and communities."));

        userRepository.save(createVolunteerUser("Karen", "Anderson",
                "Technology, Coding",
                "1 year of experience in tech workshops for kids",
                "Bridge the digital divide for underprivileged youth.",
                "Enthusiastic about teaching coding skills to the next generation."));

        userRepository.save(createVolunteerUser("Matthew", "Thomas",
                "Sports, Leadership",
                "2 years of coaching youth sports",
                "Develop leadership skills through athletics.",
                "Believes in the power of teamwork and discipline."));

        userRepository.save(createVolunteerUser("Nancy", "Jackson",
                "Writing, Blogging",
                "3 years of experience in educational content creation",
                "Support educational equity through storytelling.",
                "Excited to share inspiring stories that educate and uplift."));

    }

    private NgoUser createNgoUser(String name, String strategies, String projects, String projectExperience, String socialGoals, String description) {
        NgoUser ngoUser = new NgoUser();
        ngoUser.setName(name);
        ngoUser.setEmail(name.toLowerCase().replace(" ", ".") + "@example.com");
        ngoUser.setPassword("ngo"); // Use a secure password mechanism in production
        ngoUser.setRole(Role.NGO);
        ngoUser.setStrategies(strategies);
        ngoUser.setProjects(projects);
        ngoUser.setProjectExperience(projectExperience);
        ngoUser.setSocialGoals(socialGoals);
        ngoUser.setDescription(description);
        return ngoUser;
    }

    private BizUser createBizUser(String name, String strategies, String partners, BigDecimal budget,
                                  CompanySize companySize, String socialGoals) {
        BizUser bizUser = new BizUser();
        bizUser.setName(name);
        bizUser.setEmail(name.toLowerCase().replace(" ", ".") + "@example.com");
        bizUser.setPassword("ngo"); // Use a secure password mechanism in production
        bizUser.setRole(Role.BUSINESS);
        bizUser.setStrategies(strategies);
        bizUser.setBudget(budget);
        bizUser.setPartners(partners);
        bizUser.setCompanySize(companySize);
        bizUser.setSocialGoals(socialGoals);
        bizUser.setDescription("A company dedicated to supporting NGOs and enhancing community impact through strategic partnerships.");
        return bizUser;
    }

    private VolunteerUser createVolunteerUser(String firstName, String lastName, String hobbies,
                                              String experience, String socialGoals, String description) {
        VolunteerUser volunteerUser = new VolunteerUser();
        volunteerUser.setFirstName(firstName);
        volunteerUser.setLastName(lastName);
        volunteerUser.setHobbies(hobbies);
        volunteerUser.setExperience(experience);
        volunteerUser.setEmail(firstName.toLowerCase() + "." + lastName.toLowerCase() + "@example.com");
        volunteerUser.setPassword("ngo"); // Use a secure password mechanism in production
        volunteerUser.setRole(Role.VOLUNTEER);
        volunteerUser.setSocialGoals(socialGoals);
        volunteerUser.setDescription(description);
        return volunteerUser;
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
