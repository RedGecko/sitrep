SET check_function_bodies = false;
INSERT INTO public.locations (id, name, coordinates, updated_at, created_at) VALUES ('20e8227e-7c7d-4701-84fe-f9c9b4fa6514', 'Glattpark, Opfikon', '(47.42064579541391,8.563550153323094)', '2022-07-20 15:14:58.919685+00', '2022-07-20 15:14:58.919685+00');
INSERT INTO public.locations (id, name, coordinates, updated_at, created_at) VALUES ('21115349-3eba-4eb3-bf8f-375f36318111', 'ZASZ Erstfeld', NULL, '2022-07-26 11:17:57.633777+00', '2022-07-26 11:17:57.633777+00');
INSERT INTO public.locations (id, name, coordinates, updated_at, created_at) VALUES ('079c01de-da0e-4efd-beff-8594f75f3bb5', 'test location', '(1,2)', '2022-07-26 12:36:42.304706+00', '2022-07-26 12:36:42.304706+00');
INSERT INTO public.incidents (id, created_at, updated_at, closed_at, deleted_at, name, location_id) VALUES ('7ce3bd18-f6ae-4d73-9c9c-cc7e3661c533', '2022-07-26 12:36:42.304706+00', '2022-07-26 13:56:43.820851+00', '2022-07-26 13:56:43.812+00', NULL, 'test', '079c01de-da0e-4efd-beff-8594f75f3bb5');
INSERT INTO public.incidents (id, created_at, updated_at, closed_at, deleted_at, name, location_id) VALUES ('91f26e63-59fd-4589-be08-fd30cf6d69a6', '2022-07-26 09:15:52.872569+00', '2022-07-26 13:56:45.708915+00', '2022-07-26 13:56:45.702+00', NULL, 'Test', '21115349-3eba-4eb3-bf8f-375f36318111');
INSERT INTO public.incidents (id, created_at, updated_at, closed_at, deleted_at, name, location_id) VALUES ('66a20944-670e-4768-9056-d34833aaeee5', '2022-07-20 15:14:58.919685+00', '2022-07-26 13:57:45.823264+00', NULL, NULL, 'Test Incident', '20e8227e-7c7d-4701-84fe-f9c9b4fa6514');
INSERT INTO public.divisions (name, description, incident_id, id) VALUES ('FW', NULL, '66a20944-670e-4768-9056-d34833aaeee5', '614219a2-c1f0-4ad2-a7f9-404092aeb625');
INSERT INTO public.divisions (name, description, incident_id, id) VALUES ('Pol', NULL, '66a20944-670e-4768-9056-d34833aaeee5', 'b2f0f899-b274-475f-a3fe-cd66f5aacda0');
INSERT INTO public.divisions (name, description, incident_id, id) VALUES ('GSUD', NULL, '66a20944-670e-4768-9056-d34833aaeee5', '28ef1b5a-8f8d-450c-b50d-9a9ff72b774a');
INSERT INTO public.divisions (name, description, incident_id, id) VALUES ('ZSO Uri', 'Zivilschutz Uri', NULL, '2c1f83f6-3fab-4969-855f-6b6e0bec7de9');
INSERT INTO public.journals (id, created_at, updated_at, deleted_at, incident_id, name) VALUES ('a19366a6-f3f4-4484-90c4-ec0bbada14ab', '2022-07-25 10:16:22.430078+00', '2022-07-25 10:16:22.430078+00', '2022-07-25 10:16:22.430078+00', '66a20944-670e-4768-9056-d34833aaeee5', 'Test Journal');
INSERT INTO public.users (id, name, created_at, updated_at, email) VALUES ('6d9ef59e-eaea-4b9e-852b-038441f18c30', 'Dani', '2022-07-20 15:19:25.880111+00', '2022-07-20 15:19:25.880111+00', 'daa@greenhat.ch');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('dcf618e3-bbfd-4add-a732-a5c345fff652', '2022-07-20 15:23:00.536697+00', '2022-07-25 10:18:11.251367+00', NULL, 'Test Nachricht', 'Dani', 'Lukas', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-20 15:26:41.591958+00', 'pending', 'normal', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('d5008c60-39c9-426c-9359-f00868d74155', '2022-07-20 15:27:17.04658+00', '2022-07-25 10:18:11.251367+00', NULL, 'Test Nachricht 2323', 'Dani', 'Lukas', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-20 15:27:17.04658+00', 'pending', 'normal', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('dca4f8fb-941a-49cf-8e79-8891b6ee2838', '2022-07-25 08:43:51.079629+00', '2022-07-25 21:13:27.353161+00', NULL, 'foobarasfdasf', 'Dani', 'Lukas', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-25 08:42:10+00', 'done', 'high', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('bec0b267-5181-46d2-aca0-76d6b963ead3', '2022-07-25 22:16:50.430677+00', '2022-07-25 22:16:50.430677+00', NULL, 'foobar', 'Sender Test', 'Receiver Test', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-25 08:42:10+00', 'pending', 'normal', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('3b273055-56a9-4123-a0c3-44c426672128', '2022-07-25 22:18:07.570638+00', '2022-07-25 22:18:07.570638+00', NULL, 'foobar', 'Sender Test', 'Receiver Test', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-25 22:18:07.570638+00', 'pending', 'normal', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('5c54c743-84bf-4455-80c7-6cc05f514818', '2022-07-25 22:18:11.932398+00', '2022-07-25 22:18:11.932398+00', NULL, 'foobar', 'Sender Test', 'Receiver Test', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-25 22:18:11.932398+00', 'pending', 'normal', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('a2715332-6879-4b0f-91c6-f1509f39a100', '2022-07-25 22:18:16.135652+00', '2022-07-25 22:19:00.894747+00', NULL, 'foobar', 'Sender Test', 'Receiver Test', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-25 22:18:16.135652+00', 'done', 'normal', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.messages (id, created_at, updated_at, deleted_at, content, sender, receiver, author_id, "time", triage_id, priority_id, journal_id) VALUES ('af56f9d2-b0c3-41c9-8a67-5d212a82b8d7', '2022-07-20 15:27:08.791973+00', '2022-07-26 14:19:31.382268+00', NULL, '# Test \n * NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest NachrichtTest Nachricht', 'Dani', 'Lukas', '6d9ef59e-eaea-4b9e-852b-038441f18c30', '2022-07-20 15:27:08.791973+00', 'done', 'critical', 'a19366a6-f3f4-4484-90c4-ec0bbada14ab');
INSERT INTO public.message_division (id, message_id, division_id) VALUES ('b482628d-5663-4916-be9a-9888bd674e7c', 'dcf618e3-bbfd-4add-a732-a5c345fff652', '614219a2-c1f0-4ad2-a7f9-404092aeb625');
INSERT INTO public.message_division (id, message_id, division_id) VALUES ('c9c5568a-9fdb-497e-b337-d9828c28e16b', 'dcf618e3-bbfd-4add-a732-a5c345fff652', 'b2f0f899-b274-475f-a3fe-cd66f5aacda0');
INSERT INTO public.message_division (id, message_id, division_id) VALUES ('d32deacf-9d92-490a-8ebc-4db37d869b51', 'dcf618e3-bbfd-4add-a732-a5c345fff652', '28ef1b5a-8f8d-450c-b50d-9a9ff72b774a');
INSERT INTO public.message_division (id, message_id, division_id) VALUES ('a71f6058-40c0-4593-a046-2dbfc0af94c4', 'd5008c60-39c9-426c-9359-f00868d74155', '2c1f83f6-3fab-4969-855f-6b6e0bec7de9');
