"use client";

import { checkout, checkoutStory } from "@/resources";
import {
  Background,
  Button,
  Column,
  Heading,
  Icon,
  Input,
  opacity,
  Row,
  SpacingToken,
} from "@once-ui-system/core";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Checkout: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const router = useRouter();
  const [storyId, setStoryId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateInput = (value: string): boolean => {
    if (value.trim() === "") {
      setError("Please enter a Story ID or Link.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Use regex to find the first sequence of digits in the input string.
    const numericMatch = inputValue.match(/\d+/);
    
    // If digits are found, use them; otherwise, the value is an empty string.
    const extractedId = numericMatch ? numericMatch[0] : "";

    setStoryId(extractedId);
    validateInput(extractedId); // Validate the extracted ID in real-time.
  };

  const handleBlur = () => {
    validateInput(storyId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading
    if (validateInput(storyId)) {
      // If the input is valid, build the URL and navigate to the dynamic route
      const checkoutUrl = `/checkout/${encodeURIComponent(storyId)}`;
      router.push(checkoutUrl);
    }
  };

  if (checkoutStory.display === false) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      vertical="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: checkout.effects.mask.x,
          y: checkout.effects.mask.y,
          radius: checkout.effects.mask.radius,
          cursor: checkout.effects.mask.cursor,
        }}
        gradient={{
          display: checkout.effects.gradient.display,
          opacity: checkout.effects.gradient.opacity as opacity,
          x: checkout.effects.gradient.x,
          y: checkout.effects.gradient.y,
          width: checkout.effects.gradient.width,
          height: checkout.effects.gradient.height,
          tilt: checkout.effects.gradient.tilt,
          colorStart: checkout.effects.gradient.colorStart,
          colorEnd: checkout.effects.gradient.colorEnd,
        }}
        dots={{
          display: checkout.effects.dots.display,
          opacity: checkout.effects.dots.opacity as opacity,
          size: checkout.effects.dots.size as SpacingToken,
          color: checkout.effects.dots.color,
        }}
        grid={{
          display: checkout.effects.grid.display,
          opacity: checkout.effects.grid.opacity as opacity,
          color: checkout.effects.grid.color,
          width: checkout.effects.grid.width,
          height: checkout.effects.grid.height,
        }}
        lines={{
          display: checkout.effects.lines.display,
          opacity: checkout.effects.lines.opacity as opacity,
          size: checkout.effects.lines.size as SpacingToken,
          thickness: checkout.effects.lines.thickness,
          angle: checkout.effects.lines.angle,
          color: checkout.effects.lines.color,
        }}
      />
      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {checkoutStory.title}
        </Heading>
      </Column>
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
        method="post"
        id="mc-embedded-checkout-form"
        name="mc-embedded-checkout-form"
      >
        <Row
          id="mc_embed_signup_scroll"
          fillWidth
          maxWidth={24}
          s={{ direction: "column" }}
          gap="8"
        >
          <Input
            formNoValidate
            id="mce-INPUT"
            name="INPUT"
            // Kept as "text" to avoid number input spinners.
            type="text"
            // These improve mobile UX by showing a numeric keyboard.
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Story ID | Story Link"
            required
            // Now uses the new single handler and shows the processed storyId.
            value={storyId} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            hasPrefix={
              <Icon marginLeft="4" onBackground="neutral-weak" name="book" size="xs" />
            }
            errorMessage={error}
          />
          <div style={{ display: "none" }}>
            <input
              type="checkbox"
              readOnly
              name="group[3492][1]"
              id="mce-group[3492]-3492-0"
              value=""
              checked
            />
          </div>
          <div id="mce-responses" className="clearfalse">
            <div
              className="response"
              id="mce-error-response"
              style={{ display: "none" }}
            ></div>
            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            ></div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>
          <div className="clear">
            <Row height="48" vertical="center">
              <Button type="submit" id="mc-embedded-checkout" value="Checkout" size="m" fillWidth>
                Continue
              </Button>
            </Row>
          </div>
        </Row>
      </form>
    </Column>
  );
};
