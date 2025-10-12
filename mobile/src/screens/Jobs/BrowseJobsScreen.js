import { View, Text, FlatList, RefreshControl } from "react-native";
import JobCard from "../../components/JobCard";
import Button from "../../components/Button";
import VoiceMicButton from "../../components/VoiceMicButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../store/slices/jobs";
import { initVoice, start, stop, destroy } from "../../services/stt";
import { parseVoiceQuery } from "../../utils/voiceHelpers";
import OfflineNotice from "../../components/OfflineNotice";
import { useTranslation } from "react-i18next";

export default function BrowseJobsScreen({ navigation }) {
  const { list, status } = useSelector((s) => s.jobs);
  const { isOnline } = useSelector((s) => s.network);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchJobs(filters));
  }, [filters]);

  useEffect(() => {
    initVoice((text) => {
      const q = parseVoiceQuery(text);
      setFilters({ category: q.category || undefined });
    }, console.warn);
    return () => destroy();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0b0f14", padding: 12 }}>
      <OfflineNotice online={isOnline} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>
          {t("jobs")}
        </Text>
        <Button
          title={t("create_job")}
          onPress={() => navigation.navigate("CreateJob")}
        />
      </View>
      <FlatList
        data={list}
        keyExtractor={(i) => i._id}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={() => dispatch(fetchJobs(filters))}
          />
        }
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate("JobDetails", { job: item })}
          />
        )}
      />
      <VoiceMicButton
        onPress={() => start().then(() => setTimeout(() => stop(), 4000))}
      />
      <Text style={{ color: "#9ca3af", textAlign: "center" }}>
        {t("voice_search_hint")}
      </Text>
    </View>
  );
}
